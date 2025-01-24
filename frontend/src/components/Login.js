import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router"
import axios from "../api/axios"
import AuthContext from "../context/AuthProvider";

const LOGIN_URL = '/auth'
const HOME_URL = '/home'

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(LOGIN_URL, {username, password});
      const accessToken = response.data.accessToken;

      setAuth({ "username": username, accessToken: accessToken});
      navigate(HOME_URL);
    }
    catch(err){
      alert("Wrong username or password!");
    } 
  } 

  return (
    <div className="wrapper-login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input 
          placeholder="Enter your username..." 
          required 
          onChange={(e) => {setUsername(e.target.value)}}/>
        </div>

        <div className="input-box">
          <input 
          placeholder="Enter your password..." 
          type="password"
          required 
          onChange={(e) => {setPassword(e.target.value)}}/>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
