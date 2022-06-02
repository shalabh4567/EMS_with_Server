import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

function Middle() {
  return (
    <div className="cover-background">
      <div className="right-div">
        <div className="inner-right-div">
          <h1>Let's create a better world together</h1>
          <br />
          <h2>
            Ernst and Young
            <br />
            Our purpose is Building a better working world .
          </h2>
          <br />
          <div className="buttons">
            <div className="SignupButton">
              <button type="button" className="btn btn-lg">
                <Link to="signup">Sign Up</Link>
              </button>{" "}
            </div>

            <br />
            <div className="LoginButton">
              <button type="button" className="btn btn-lg">
                <Link to="login">Login</Link>
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Middle;
