import React, { useState } from "react";
import "./ForgotPassword.css";
import "../Forms.css"
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [mess, setMess] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const host = "http://localhost:5000";

  const forgetPassword = async () => {
    setSuccess(false);
    setErr(false);

    const response = await fetch(`${host}/api/auth/forgetpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
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
  };

  return (
    <div className="w-100 h-100 d-flex justify-content-center main-content">
      <div className="form-content2 m-auto">
        <form className="content">
          <div className="mb-4 col-12 form-head">
            <div>Reset Password</div>
            <div style={{ fontSize: `${0.9}rem` }}>
              Enter your email address to get reset password link.
            </div>
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-1 col-12">
            <button
              type="submit"
              className="btn btn-primary col-12"
              onClick={(e) => {
                e.preventDefault();
                forgetPassword();
              }}
            >
              Send link
            </button>
          </div>
          {success ? (
            <div
              className="p-1 mt-1 text-success text-center"
              style={{ fontFamily: "Times New Roman" }}
            >
              {mess}
            </div>
          ) : (
            ""
          )}
          {err ? (
            <div>
              <div
                className="mt-1 text-warning text-break text-center"
                style={{ fontFamily: "Times New Roman" }}
              >
                {mess}
              </div>
              <div className="row justify-content-end">
                <div className="form-text mb-3 mt-1 col-auto reset">
                  To register your account {" "}
                  <button onClick={() => navigate("/signup")}>
                    click here
                  </button>
                </div>
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

export default ForgotPassword;
