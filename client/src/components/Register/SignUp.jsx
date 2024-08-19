import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import "../Forms.css";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [mess, setMess] = useState("");
  const [err, setErr] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    r_password: "",
    area: "",
    type: "",
    mobileNumber: "",
    varified: false
  });
  const host = "http://localhost:5000";
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, type: e.target.value });
  };

  const createUser = async () => {
    const {
      fname,
      lname,
      email,
      password,
      r_password,
      area,
      type,
      mobileNumber,
      varified
    } = formData;
    const name = fname + " " + lname;
    
    if (password !== r_password) {
      setMess("Text of password and re-entered password do not match.");
      setErr(true);
      return;
    }
    
    const response = await fetch(`${host}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        area,
        type,
        mobileNumber,
        varified
      }),
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem("token", data.authtoken);
      setSuccess(true);
      setMess(data.message);
    } else {
      setErr(true);
      setMess(data.message);
    }
  };

  return (
    <div className="w-100 h-100 d-flex justify-content-center main-content">
      <div className="form-content1 m-auto">
        <form className="content">
          <div className="mb-4 col-12 form-head"> Create an account! </div>
          <div className="mt-2">
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                id="validationDefault01"
                placeholder="First Name"
                value={formData.fname}
                onChange={(e) => {
                  setFormData({ ...formData, fname: e.target.value });
                }}
                required
              />
            </div>
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                id="validationDefault02"
                placeholder="Last Name"
                value={formData.lname}
                onChange={(e) => {
                  setFormData({ ...formData, lname: e.target.value });
                }}
                required
              />
            </div>
          </div>
          <div className="mt-2">
            <div className="col-12">
              <select
                className="form-select classic"
                id="validationDefault03"
                onChange={(e) =>
                  setFormData({ ...formData, area: e.target.value })
                }
                required
              >
                <option value="Area" disabled selected>
                  Select an Area
                </option>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Bengal">Bengal</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>
            <div className="col-12 mt-3">
              <label for="validationDefault04" className="form-label">
                Type
              </label>
              <div className="form-check form-check-inline mx-5">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  value="Prosumer"
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" for="validationDefault04">
                  Prosumer
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  value="Consumer"
                  onChange={handleChange}
                />
                <label className="form-check-label" for="validationDefault04">
                  Consumer
                </label>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <div className="col-12">
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                id="validationDefault05"
                placeholder="Email address"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="col-12">
              <input
                type="tel"
                className="form-control"
                pattern="[0-9]{10}"
                maxLength={10}
                id="validationDefault06"
                placeholder="Mobile number"
                onChange={(e) =>
                  setFormData({ ...formData, mobileNumber: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="mt-2">
            <div className="col-12">
              <input
                type="password"
                className="form-control"
                id="validationDefault07"
                placeholder="Password"
                minLength="8"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <div className="col-12">
              <input
                type="password"
                className="form-control"
                id="validationDefault08"
                placeholder="Re-enter Password"
                onChange={(e) =>
                  setFormData({ ...formData, r_password: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="mt-3 col-12">
            <button
              className="btn btn-primary col-12"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setErr(false);
                setSuccess(false);
                createUser();
              }}
            >
              Sign up
            </button>
            <div className="col-12 mt-4 mx-1 mb-1 tip">
              Already have an account?
            </div>
            <button
              type="submit"
              className="btn btn-primary col-12"
              onClick={() => navigate("/signin")}
            >
              Sign in
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
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
