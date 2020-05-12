import React from "react";
import Loading_img from "../../assets/images/loader.gif";
import "./styles.css";

const loading = (props) => (
  <div className="Loading">
    <img src={Loading_img} alt="loading" className={"loader"} />
  </div>
);

export default loading;
