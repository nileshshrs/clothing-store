import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "../global css/Registration.scss";
import { useSignin } from '../context/useSignin';


const Login = () => {

  const { signin, error } = useSignin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    await signin(email, password);

  }
  return (
    <section className="nOpQrS py-5">
      <form>
        <h2>Sign in.</h2>
        <p className="errMsg">{error}</p>

        <div className="aZpLmN">
          <label htmlFor="email">EMAIL*</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
        </div>
        <div className="aZpLmN">
          <label htmlFor="password">PASSWORD*</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="forgot-password">
          Forgot Password?{" "} <Link to="/forgot-password">Click Here.</Link>
        </div>
        <div className="aZpLmN">
          <button onClick={handleSubmit}>Sign up</button>
        </div>
        <div className="register">
          Don't have an account? <span><Link to="/sign-up">sign up.</Link></span>
        </div>
        <div className="register text-center">
          Note: use gmail account to login, register or account recovery
        </div>
      </form>
      <ToastContainer />
    </section>
  )
}

export default Login