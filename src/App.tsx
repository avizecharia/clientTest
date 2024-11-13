import React from 'react'
import { Route, Routes } from 'react-router'
import Register from './compomnets/auth/Register'
import Login from './compomnets/auth/Login'
import Nav from './compomnets/nav'
import DefencePage from './compomnets/pages/DefencePage'

export default function App() {
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='defence' element={<DefencePage/>}/>
      </Routes>
    </div>
  )
}
