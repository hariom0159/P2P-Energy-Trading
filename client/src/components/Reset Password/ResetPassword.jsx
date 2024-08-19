import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import "../Forms.css"

const ResetPassword = () => {
  const host = "http://localhost:5000";
  const navigate = useNavigate();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const [success, setSuccess] = useState(false);
  const [mess, setMess] = useState("");
  const [newPass, setNewPass] = useState("");
  const [pass, setPass] = useState({
    password: "",
    cpass: "",
  });
  const [err, setErr] = useState(false);

  const resetPassword = async () => {
    const response = await fetch(`${host}/api/auth/resetpassword/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newpassword: newPass,
      }),
    });
    const data = await response.json();
    if (data.success) {
      setSuccess(true);
      setMess(data.message);
    } else {
      setErr(true);
      setMess(data.message);
    }
    pass.password = "";
    pass.cpass = "";
  };

  return (
    <div className="w-100 h-100 d-flex justify-content-center main-content">
      <div className="form-content2 m-auto">
        <form className="content">
          <div className="mb-4 col-12 form-head"> Reset your password </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="New Password"
              minLength="8"
              value={pass.password}
              onChange={(e) => {
                setPass({ ...pass, password: e.target.value });
                setNewPass(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Confirm Password"
              value={pass.cpass}
              onChange={(e) => setPass({ ...pass, cpass: e.target.value })}
            />
          </div>
          <div className="mt-1 col-12">
            <button
              type="submit"
              className="btn btn-primary col-12"
              onClick={(e) => {
                setSuccess(false);
                setErr(false);
                e.preventDefault();
                if (pass.password === pass.cpass) {
                  resetPassword();
                } else {
                  setErr(true);
                  setMess(
                    "The text in password and confirm password do not match"
                  );
                }
              }}
            >
              Reset Password
            </button>
          </div>
          {success ? (
            <div>
              <div
                className="mt-1 text-success text-break text-center"
                style={{ fontFamily: "Times New Roman" }}
              >
                {mess}
              </div>
              <div className="row justify-content-center">
                <div className="tip mb-2 mt-1 col-auto reset">
                  <button onClick={() => navigate("/signin")}>
                    Click here
                  </button>{" "}
                  to login with new password.
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {err ? (
            <div
              className="mt-1 text-warning text-break text-center"
              style={{ fontFamily: "Times New Roman" }}
            >
              {mess}
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
