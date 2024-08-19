import React from "react";
import "./ErrorPage.css";
import "../Forms.css";

const ErrorPage = () => {
  return (
    <div className="w-100 h-100 d-flex justify-content-center main-content">
      <div className="form-content3 content m-auto">
        <h1>Oops..!</h1>
        <h2> 404 - Page not found :( </h2>
        <h5>The requested page is not found on this server.</h5>
      </div>
    </div>
  );
};

export default ErrorPage;
