import { createContext } from "react";
import { useState } from "react";
import React from "react";

export const UserContext = createContext();

export const UserState = (props) => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    mobileNumber: "",
    type: "",
    area: "",
    verified: false,
  });
  const host = "http://localhost:5000";

  const setuser = (id, name, email, mobileNumber, type, area, verified) => {
    setUser({ id, name, email, mobileNumber, type, area, verified });
  };

  const getUser = async () => {
    //API call
    await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((e) => console.error(e));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        setuser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
