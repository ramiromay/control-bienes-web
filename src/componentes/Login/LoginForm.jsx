import React from 'react'
import { FaUser, FaLock } from 'react-icons/fa'
import '../../style'

const LoginForm = () => {
  return (
    <div className='wrapper'>
        LOGINFORM
        <form action="">
            <h1>LOGIN</h1>
            <div className="input-box">
                <input type="text" placeholder='Username' required/>
                <FaUser />
            </div>
            <div className="input-box">
                <input type="password" placeholder='Password' required/>
                <FaLock />
            </div>
            <div className="remember-forgot">
                <label><input type="checkbox" />Remember me</label>
                <a href="#">Forgot Password</a>
            </div>

            <button>Inciciar Sesión</button>
        </form>
    </div>
  )
}

export default LoginForm