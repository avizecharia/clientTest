import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { DataStatus, luncheState } from "../../types/redux";
import { ILunche } from "../../types/ILunche";

const initialState: luncheState = {
  error: null,
  status: DataStatus.IDLE,
  launches: [],
};

// //מגן בפעולה 
// export const fetchUpdateDeffenceAmount = createAsyncThunk(
//   "lunche/deffenceLunche",
//   async (details:{newstatus:string,roketType:string,launcheId:string},thunkApi) =>{
//     try {
//       const res = await fetch(
//         `http://localhost:7770/api/launche/status/${details.launcheId}`,
//         {
//           method: "POST",
//           headers: { authorization: localStorage.token },
//           body: JSON.stringify(details)
//         },
//       );
//       if (res.status != 200) {
//         thunkApi.rejectWithValue("Cant get the list ,please try again");
//       }
//       const data: ILunche[] = await res.json();
//       console.log(data);
//       return data;
//     } catch (error) {
      
//     }
//   }
// )


// getting your missles that lunche to your  area 
export const fetchGetDefenceAttack = createAsyncThunk(
  "lunche/getDefenceAttack",
  async(area:string,thunkApi)=>{
    try {
      const res = await fetch(
        `http://localhost:7770/api/launche/getDefenceAttack/${area}`,
        {
          method: "GET",
          headers: { authorization: localStorage.token },
        }
      );
      if (res.status != 200) {
        thunkApi.rejectWithValue("Cant get the list ,please try again");
      }
      const data: ILunche[] = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(`Cant get the list ,please try again${error}`);
      
    }
  }
)
// get tour list of your launche anemy
export const fetchGetLaunche = createAsyncThunk(
  "lunche/getList",
  async (userId: string, thunkApi) => {
    try {
      const res = await fetch(
        `http://localhost:7770/api/launche/getYourLaunche/${userId}`,
        {
          method: "GET",
          headers: { authorization: localStorage.token },
        }
      );
      if (res.status != 200) {
        thunkApi.rejectWithValue("Cant get the list ,please try again");
      }
      const data: ILunche[] = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      thunkApi.rejectWithValue(`Cant get the list ,please try again${err}`);
    }
  }
);
//create lunche
export const fetchLunche = createAsyncThunk(
  "lunche/lunche",
  async (launche: ILunche, thunkApi) => {
    try {

      const res = await fetch(`http://localhost:7770/api/launche/launch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": localStorage.token,
        },
        body: JSON.stringify(launche),
      });
      if (res.status != 201) {
        thunkApi.rejectWithValue("Cant vote ,please try again");
      }
    } catch (err) {
      thunkApi.rejectWithValue(`Cant get the list ,please try again${err}`);
    }
  }
);

const launcheSlice = createSlice({
  name: "launche",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<luncheState>) => {
    builder
      .addCase(fetchGetLaunche.pending, (state, action) => {
        state.status = DataStatus.LOADING;
        state.error = null;
        state.launches = [];
      })
      .addCase(fetchGetLaunche.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCCESS;
        state.error = null;
        state.launches = action.payload as unknown as ILunche[];
      })
      .addCase(fetchGetLaunche.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error as string;
        state.launches = [];
      }).addCase(fetchGetDefenceAttack.pending, (state, action) => {
        state.status = DataStatus.LOADING;
        state.error = null;
        state.launches = [];
      })
      .addCase(fetchGetDefenceAttack.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCCESS;
        state.error = null;
        state.launches = action.payload as unknown as ILunche[];
      })
      .addCase(fetchGetDefenceAttack.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error as string;
        state.launches = [];
      });
  },
});

export default launcheSlice;
