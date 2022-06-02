import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { sleep } from "../../utils/sleepPropmise";
import LeftSide from "../../utils/loginSignupLeftSide/LeftSide";
import ToastMessage from "../toastMessage/ToastMessage";
import "./Login.css";

const Login = () => {
  const { state, dispatch } = useContext(AdminContext);

  useEffect(() => {
    if (state) {
      history("/");
    }
  }, []);

  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [err, setErr] = useState(null);

  const emailError = useRef(null);
  const passwordError = useRef(null);

  const login = (e) => {
    e.preventDefault();
    console.log(email, password);
    if (email && password === "") {
      alert("all the fields are required");
      return;
    }

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((error) => {
          throw new Error(error.error);
        });
      })
      .then((data) => {
        // console.log(data);
        setErr("Logged In Succesfully");
        setShowToast(true);
        sleep(1500).then(() => {
          localStorage.setItem("admin", JSON.stringify(data.user));
          localStorage.setItem("token", JSON.stringify(data.token));
          dispatch({ type: "ADMIN", payload: data.user });
          history("/dashboard");
        });
      })
      .catch((err) => {
        setErr(err.message);
        setShowToast(true);
        
      });
  };

  return (
    <div className="signup-container">
      <ToastMessage
        showToast={showToast}
        setShowToast={setShowToast}
        message={err}
      />
      <LeftSide />
      <div className="right-view">
        <div className="right-view-inner">
          <div className="right-view-margin">
            <div className="logo">
              <Link to="/">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 113 55"
                  className="logo-name-Image"
                  style={{ enableBackground: "new 0 0 113 55" }}
                  xmlSpace="preserve"
                >
                  <clipPath id="ey-logo-first-line">
                    <rect x="42" y="36" width="71" height="10" />
                  </clipPath>
                  <clipPath id="ey-logo-second-line">
                    <rect x="42" y="46" width="71" height="10" />
                  </clipPath>
                  <polygon
                    className="ey-logo-yellow"
                    points="51.2,0 0,19.3 0,19.3 51.2,10 "
                    style={{ fill: "yellow" }}
                  />
                  <polygon
                    points="34.3,27 30,35.5 25.6,27 17,27 26.1,42.7 26.1,52.9 33.8,52.9 33.8,42.7 42.8,27 "
                    style={{ fill: "#2e2e38" }}
                  />
                  <polygon
                    points="7.7,42.7 17,42.7 17,37.3 7.7,37.3 7.7,33 18,33 14.6,27 0,27 0,52.9 20.6,52.9 20.6,47 7.7,47 "
                    style={{ fill: "#2e2e38" }}
                  />
                </svg>
              </Link>
            </div>

            <div className="signIn-Written">
              <h5>Signin to begin with managing your tasks.</h5>
            </div>
            <div className="forms-for-signup">
              <form onSubmit={login}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Login ID
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    onChange={(e) => {
                      if (e.target.value.length === 0) {
                        emailError.current.innerHTML = "*field is required";
                        setEmail("");
                        return;
                      }
                      emailError.current.innerHTML = "";
                      setEmail(e.target.value);
                    }}
                  />
                  <span
                    className="errorMessage"
                    id="emailError"
                    ref={emailError}
                  ></span>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    onChange={(e) => {
                      if (e.target.value.length === 0) {
                        passwordError.current.innerHTML = "*field is required";
                        setPassword("");
                        return;
                      }
                      passwordError.current.innerHTML = "";
                      setPassword(e.target.value);
                    }}
                  />
                  <span
                    className="errorMessage"
                    id="passwordError"
                    ref={passwordError}
                  ></span>
                </div>
                <button type="submit" className="btn submit-button">
                  Signin
                </button>
              </form>
            </div>
            <div className="remember-forgot-password">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Remember me
                </label>
              </div>
              <h5>Forgot your password</h5>
            </div>
            <div className="signup-with-google">
              <Link to="/signup">
                <h6>
                  Don’t have account? <u>Signup</u>
                </h6>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
