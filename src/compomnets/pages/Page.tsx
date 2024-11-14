import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/strore";
import {
  fetchGetDefenceAttack,
  fetchGetLaunche,
  fetchLunche,
} from "../../redux/slice/launche";
import { Route, useNavigate } from "react-router";
import { ILunche } from "../../types/ILunche";
import { getSpeedByName } from "../../utils/rocketSpeed";
import { fetchGetUser } from "../../redux/slice/userSlice";
import { socket } from "../../main";
import { lasyMissile, myFastmissle } from "../../utils/myFestetsMissile";

export interface RoketType {
  name: string;
  amount: number;
}

export default function Page() {
  const { user } = useAppSelector((state: RootState) => state.user);
  const [area, setArea] = useState("North");
  const dis = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
      return;
    }
    if (user?.area) {
      dis(fetchGetDefenceAttack(user.area));
    } else {
      dis(fetchGetLaunche(user?._id!));
    }
  }, []);
  const { launches } = useAppSelector((state: RootState) => state.launch);

  const handelDeffence = async (launche: ILunche) => {
    
    const myFastestMissile = myFastmissle(user?.resources!);
    const myLaseymissile = lasyMissile(user?.resources!)
    if(myLaseymissile.speed <= launche.time){
      console.log("plpllp");
      // להוריד מהUSER AMOUNT
      const details = {newstatus:"intercepted",roketType:myLaseymissile.name}
      console.log(details);
      
      try {
        const res = await fetch(
          `http://localhost:7770/api/launche/status/${launche._id}`,
          {
            method: "POST",
            headers: { authorization: localStorage.token },
            body: JSON.stringify(details)
          },
        );
      } catch (error) {
        console.log(error);
      }
      await dis(fetchGetUser(user?._id!));
      socket.emit("newLaunche");
      //SET INTERVAK אחרי כמה שניות לעשות בקשה לשנות סטטוס
    }
    // if (myFastestMissile >= launche.time) {

    // }
    //אם לא יורט לשנות סטטוס לפגע
  };

  const handelLunche = async (rocketType: string) => {
    const lanche: ILunche = {
      location: user?.area == null ? area : null,
      rocket: rocketType,
      status: "launched",
      time: await getSpeedByName(rocketType),
      userId: user?._id,
    };
    await dis(fetchLunche(lanche));
    if (user?.area) {
      await dis(fetchGetDefenceAttack(user.area));
    } else {
      await dis(fetchGetLaunche(user?._id!));
    }
    await dis(fetchGetUser(user?._id!));
    socket.emit("newLaunche");
  };
  useEffect(() => {
    socket.on("newLaunchHasOccurred", () => {
      if (user?.area) {
        dis(fetchGetDefenceAttack(user.area));
      } else {
        dis(fetchGetLaunche(user?._id!));
      }
      // toast.info("Someone somewhere just voted");
    });
  }, []);
  return (
    <div>
      <h1>
        {user?.origin} {user?.area}
      </h1>
      <div>
        {!user?.area && (
          <select
            name=""
            id=""
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="Center">Center</option>
            <option value="WestBank">WestBank</option>
          </select>
        )}

        {user?.resources.map((r: RoketType) =>
          user.area == null ? (
            <>
              <button
                onClick={() => handelLunche(r.name)}
                disabled={r.amount <= 0}
              >
                {r.name} {r.amount}
              </button>
            </>
          ) : (
            <p>
              {r.name} {r.amount}
            </p>
          )
        )}
      </div>
      <div>
        <h1>Launched Rocket</h1>
        <table>
          <tr>
            <th>Rocket</th>
            <th>Time To Hit</th>
            <th>Status</th>
          </tr>
          {launches.map((l: ILunche) => (
            <tr>
              <td>{l.rocket}</td>
              <td>{l.time}</td>
              <td>
                {l.status}
                {user?.area != null && l.status == "launched" && (
                  <button
                    disabled={myFastmissle(user?.resources!) >= l.time}
                    onClick={() => {
                      handelDeffence(l);
                    }}
                  >
                    X
                  </button>
                )}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
