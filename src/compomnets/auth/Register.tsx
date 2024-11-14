import React, { useEffect, useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/strore'
import { fetchRegister } from '../../redux/slice/userSlice'
import { useNavigate } from 'react-router'

export default function register() {
  const {user} = useAppSelector((state:RootState)=> state.user)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [origin, setOrigin] = useState("IDF")
  const [area, setArea] = useState("North")
  const dis = useAppDispatch()
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?._id){
        navigate('/page')
    }
  },[])
  const handelRegister = () => {
    dis(fetchRegister({ username, password,origin,area:origin!="IDF" ? null : area}))
    
    navigate('/login')
  }
  return (
    <div className='login-register-page'>
      <input type="text"placeholder='username' value={username} onChange={(e)=> setUsername(e.target.value)} />
      <input type="text"placeholder='password'value={password} onChange={(e)=> setPassword(e.target.value)} />
      <select name="" id="" value={origin} onChange={(e) => setOrigin(e.target.value)}>
        <option value="IDF">IDF</option>
        <option value="Hezbollah">Hezbollah</option>
        <option value="Hamas">Hamas</option>
        <option value="IRGC">IRGC</option>
        <option value="Houthis">Houthis</option>
      </select>
      {origin == "IDF" &&
       <select name="" id="" value={area} onChange={(e) => setArea(e.target.value)}>
        <option value="North">North</option>
        <option value="South">South</option>
        <option value="Center">Center</option>
        <option value="WestBank">WestBank</option>
      </select>}
      <button onClick={handelRegister} disabled={username == "" || password == "" }>Register</button>
    </div>
  )
}
