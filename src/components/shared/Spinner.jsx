import React from "react";
import spinnerImg from "../assets/spinner.gif";

const Spinner = () => {
  return (
    <img
      src={spinnerImg}
      alt="loading"
      style={{ width: "100px", margin: "auto", display: "block" }}
    />
  );
};

export default Spinner;
