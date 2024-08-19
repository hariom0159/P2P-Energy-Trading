import React, { useState } from "react";
import "./SignIn.css";
import "../Forms.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const signIn = () => {
  const host = "http://localhost:5000";
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(false);
  const [mess, setMess] = useState("");
  const [admin, setAdmin] = useState(false);

  const adminLogin = () => {
    setAdmin(!admin);
  };

  const login = async () => {
    const { email, password } = credentials;
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem("token", data.authtoken);
      if (!admin && email !== "u19ee009@eed.svnit.ac.in") navigate("/home");
      else if(email === "u19ee009@eed.svnit.ac.in") navigate("/admin");
    } else {
      setErr(true);
      setMess(data.message);
    }
  };

  return (
    <div className="w-100 h-100 d-flex justify-content-center main-content">
      <div className="form-content2 m-auto">
        <form className="content">
          <div className="mb-4 col-12 form-head"> Sign in to account! </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={credentials.email}
              placeholder="Email address"
              onChange={(e) => {
                setCredentials({ ...credentials, email: e.target.value });
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={credentials.password}
              placeholder="Password"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>

          <div className="mt-1 col-12">
            <button
              type="submit"
              className="btn btn-primary col-12"
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
            >
              Sign in
            </button>
            <div className="row justify-content-between">
              <div className="mb-3 mt-1 col-auto reset">
                <label className="tip">
                  <input
                    type="checkbox"
                    onChange={adminLogin}
                    className="mx-1"
                  />
                  Admin Login
                </label>
              </div>
              <div className="tip mb-3 mt-1 col-auto reset">
                Forgot Password?{" "}
                <button onClick={() => navigate("/forget")}>Click here</button>
              </div>
            </div>
            <div className="mt-3 mb-1 col-12 tip">Don't have an account?</div>
            <button
              type="submit"
              className="btn btn-primary col-12"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </div>
          {err ? (
            <div>
              <div
                className="mt-1 text-warning text-break text-center"
                style={{ fontFamily: "Times New Roman" }}
              >
                {mess}
              </div>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default signIn;
