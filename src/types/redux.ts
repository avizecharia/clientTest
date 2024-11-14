import { ILunche } from "./ILunche";
import { IUser } from "./IUser";


export enum DataStatus {
    LOADING = "LOADING",
    SUCCCESS = "SUCCCESS",
    FAILED = "FAILED",
    IDLE = "IDLE",
  }
  
export interface UserState {
    error: string | null;
    status: DataStatus;
    user: null | IUser;
  }
  export interface luncheState {
    error: string | null;
    status: DataStatus;
    launches: ILunche[];
  }