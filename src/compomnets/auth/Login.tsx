import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/strore";
import { useNavigate } from "react-router";
import { fetchLogin } from "../../redux/slice/userSlice";

export default function login() {
  const dis = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?._id) return;
    navigate("/page");
  }, [user]);
  useEffect(() => {
    if (user?._id) {
      return navigate("/page");
    }
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handelLogin = async() => {
    await dis(fetchLogin({ username, password }))
  }
  return (
    <div className="login-register-page">
      <input
        type="text"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        disabled={username == "" || password == ""}
        onClick={handelLogin}
      >
        Login
      </button>
    </div>
  );
}
