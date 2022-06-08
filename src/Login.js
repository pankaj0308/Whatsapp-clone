import "./css/Login.css";
import React from "react";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login-container">
        <img
          src="https://www.freepnglogos.com/uploads/whatsapp-logo-png-hd-2.png"
          width="200"
          alt="Logo"
        />
        <div className="login-text">
          <h2>Welcome to Whatsapp</h2>
          <button onClick={signIn}>Sign in with Google</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
