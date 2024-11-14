import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slice/userSlice"
import { useDispatch, useSelector } from "react-redux"
import launcheSlice from "./slice/launche"

const store  = configureStore({
    reducer:{
        user:userSlice.reducer,
        launch:launcheSlice.reducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export default store