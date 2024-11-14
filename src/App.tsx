import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Register from './compomnets/auth/Register'
import Login from './compomnets/auth/Login'
import Page from './compomnets/pages/Page'
import Nav from './compomnets/Nav'
import { RootState, useAppDispatch, useAppSelector } from './redux/strore'
import { socket } from './main'
import { fetchGetDefenceAttack, fetchGetLaunche } from './redux/slice/launche'

export default function App() {
  const dis = useAppDispatch()
  const {user} = useAppSelector((state:RootState) => state.user)
  // useEffect(()=>{
  //   socket.on("newLaunchHasOccurred",()=>{
  //     if(user?.area){
  //        dis(fetchGetDefenceAttack(user.area))
  //     }
  //     else{

  //       dis(fetchGetLaunche(user?._id!))
  //     }
  //     // toast.info("Someone somewhere just voted");
  //   })

  // },[])
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='page' element={<Page/>}/>
      </Routes>
    </div>
  )
}
