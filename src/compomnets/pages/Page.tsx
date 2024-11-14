import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/strore";
import {
  fetchGetDefenceAttack,
  fetchGetLaunche,
  fetchLunche,
  fetchUpdateDeffenceAmount,
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
  const [timing, setTiming] = useState<HTMLInputElement>();
  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
      return;
    }
    if (user?.area) {
      dis(fetchGetDefenceAttack(user.area));
    } else if (user._id) {
      dis(fetchGetLaunche(user?._id!));
    }
  }, []);
  const { launches } = useAppSelector((state: RootState) => state.launch);

  const handelDeffence = async (launche: ILunche) => {
    const myFastestMissile = myFastmissle(user?.resources!);
    const myLaseymissile = lasyMissile(user?.resources!);
    if (myLaseymissile.speed <= launche.time) {
      const details = {
        newStatus: "intercepted",
        roketType: myLaseymissile.name,
        launcheId: launche._id!,
        myUserId: user?._id,
      };
      await dis(fetchUpdateDeffenceAmount(details));
      dis(fetchGetUser(user?._id!));
      socket.emit("newLaunche");
      //SET INTERVAK אחרי כמה שניות לעשות בקשה לשנות סטטוס
    }
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

        // toast.info("Someone somewhere just voted");
      } else if (user?._id) {
        dis(fetchGetLaunche(user?._id!));
      }
      
    });
  }, []);
  return (
    <div className="page">
      <div className="upPage">
      <h1>
        {user?.origin} {user?.area}
      </h1>
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
                onClick={() => {
                  handelLunche(r.name);
                  
                }}
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
      <div className="main">
        <h1>Launched Rocket</h1>
        <table>
          <tr>
            <th>Rocket</th>
            <th>Time To Hit</th>
            <th>Status</th>
          </tr>
          {launches.map((l: ILunche) => (
            <tr className="card">
              <td>{l.rocket}</td>
              <td>
                {l.time}
              </td>
              <td>
                {l.status}
                {user?.area != null && l.status == "launched" && (
                  <button
                    disabled={myFastmissle(user?.resources!) >= l.time}
                    onClick={() => {
                      handelDeffence(l);
                    }}
                  >
                    X{" "}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </table>{" "}
      </div>
    </div>
  );
}
