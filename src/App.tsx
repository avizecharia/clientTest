import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import Register from "./compomnets/auth/Register";
import Login from "./compomnets/auth/Login";
import Page from "./compomnets/pages/Page";
import Nav from "./compomnets/Nav";
import { RootState, useAppDispatch, useAppSelector } from "./redux/strore";
import { socket } from "./main";
import launcheSlice, {
  fetchGetDefenceAttack,
  fetchGetLaunche,
} from "./redux/slice/launche";
import { useDispatch } from "react-redux";
import { fetchGetUser } from "./redux/slice/userSlice";

export default function App() {
  const dis = useAppDispatch();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);
  const { launches } = useAppSelector((state: RootState) => state.launch);
  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="page" element={<Page />} />
      </Routes>
    </div>
  );
}
