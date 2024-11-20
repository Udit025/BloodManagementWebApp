import React from "react";
import { Link } from "react-router-dom";

//css
import "../../assets/css/Footer.css";

const Footer = () => {
  return (
    // <div className="footer">
    //   <a href="/login/emp">EMP LOGIN</a>
    // </div>
    <div className="emp_login_button">
      <Link to="/login/emp">
        <button>EMP LOGIN</button>
      </Link>
    </div>
  );
};

export default Footer;
