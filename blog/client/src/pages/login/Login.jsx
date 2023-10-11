import axios from "axios";
import { useContext, useRef,useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";
import { url } from "../../config/config";
export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [errorDis, setErrorDis] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${url}/auth/login`, {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(res);
      if(res.data.status !== 'error'){
        //setErrorDis(true);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      }else{
        setErrorDis(true);
        dispatch({ type: "LOGIN_FAILURE" });
      }
    } catch (err) {
      setErrorDis(true);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      {errorDis ? <span>Wrong Credentials</span> : <></> }
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
