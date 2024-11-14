import React from 'react'
import { Route, Routes } from 'react-router'
import Register from './compomnets/auth/Register'
import Login from './compomnets/auth/Login'
import Page from './compomnets/pages/Page'
import Nav from './compomnets/nav'

export default function App() {
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
