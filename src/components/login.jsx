import {React, useState} from 'react'
import {getAuth} from "firebase/auth"
import { firebaseAuth } from '../firebase';

function Login() {

  const handleOnClick = (e)=>{
    e.preventDefault();
    let auth = getAuth();
    console.log(auth);
  }

  return (
    <div>
      <h1>Hello!</h1>
      <form>
        <button onClick={handleOnClick}>LOGIN with google</button>
      </form>
    </div>
  )
}

export default Login
