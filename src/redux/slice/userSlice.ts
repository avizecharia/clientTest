

import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
import { DataStatus, UserState } from "../../types/redux";
import { IUser } from "../../types/IUser";


  const initialState: UserState = {
    error: null,
    status: DataStatus.IDLE,
    user: null,
  };
  
export const fetchLogin = createAsyncThunk(
    "user/login",
    async (user: { username: string; password: string }, thunkApi) => {
      try {
        const res = await fetch("http://localhost:2222/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (res.status != 200) {
          thunkApi.rejectWithValue("Cant login ,please try again");
          return
        }
        const data = await res.json();
        localStorage.setItem("token",data.token)
        return data 
      } catch (err) {
        thunkApi.rejectWithValue(`${err}`);
      }
    }
  );
  
  export const fetchRegister = createAsyncThunk(
      "user/register",
      async (user: { username: string; password: string,origin:string,
        area:string|null}, thunkApi) => {
        try {
          const res = await fetch("http://localhost:7770/api/user/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          if (res.status != 200) {
            thunkApi.rejectWithValue("Cant create new user ,please try again");
            return
          }
          const data = await res.json();
          thunkApi.fulfillWithValue(data);
          
        } catch (err) {
          thunkApi.rejectWithValue(`Cant create new user ,please try again${err}`);
        }
      }
    );
  
  
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      logout:(state) => {
      state.error =  null,
      state.status = DataStatus.IDLE
      state.user =  null
      }
        
      
    },
    extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
      builder.addCase(fetchLogin.pending,(state,action)=> {
          state.status = DataStatus.LOADING
          state.error = null
          state.user = null
      }).addCase(fetchLogin.fulfilled,(state,action)=> {
          state.status = DataStatus.SUCCCESS
          state.error = null
          state.user = action.payload as unknown as IUser
      }).addCase(fetchLogin.rejected,(state,action)=> {
          state.status = DataStatus.FAILED
          state.error = action.error as string
          state.user = null
      }).addCase(fetchRegister.pending,(state,action)=> {
        state.status = DataStatus.LOADING
        state.error = null
        state.user = null
    }).addCase(fetchRegister.fulfilled,(state,action)=> {
        state.status = DataStatus.SUCCCESS
        state.error = null
        state.user = null
    }).addCase(fetchRegister.rejected,(state,action)=> {
        state.status = DataStatus.FAILED
        state.error = action.error as string
        state.user = null
    })
    },
  });
  
  export default userSlice