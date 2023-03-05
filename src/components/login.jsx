import React from 'react'
import { useState } from 'react'

function Login() {

  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleOnClick = (e)=>{
    e.preventDefault();
    alert(`USERNAME: ${userName}  PASSWORD:${password}`);
  }

  return (
    <div>
      <h1>Hello!</h1>
      <form>
        <input 
            type="text" 
            placeholder='USERNAME' 
            value={userName}
            onChange = {(e)=>{
              setUsername(e.target.value);
            }}
            />
        <input 
            type="password" 
            placeholder='PASSWORD'
            value={password}
            onChange = {(e)=>{
              setPassword(e.target.value);
            }}
            />
        <button onClick={handleOnClick}>LOGIN</button>
      </form>
    </div>
  )
}

export default Login
