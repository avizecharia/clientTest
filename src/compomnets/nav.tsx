import React from 'react'
import { NavLink } from 'react-router-dom'
import { RootState, useAppDispatch, useAppSelector } from '../redux/strore'

export default function Nav() {
    const {user} = useAppSelector((state:RootState) => state.user)
  return (
    <div><div className='nav'>
    {user ? (<>
    {/* <button onClick={handelLogout}>logout</button> */}
    </>):<>
    <NavLink to={"/login"} >Login</NavLink>
    <NavLink to={"/register"} >Register</NavLink>
    </>}
</div></div>
  )
}
