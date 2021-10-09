import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <>
      <div className="navbar">
        <div className="navbar-logo">
          <img
            src="https://react-coding-assignment.s3.ap-south-1.amazonaws.com/cards/blue_logo.svg"
            alt=""
          />
          <h3 className="navbar-heading">Happay</h3>
        </div>
        <Link to="/cart">
          <FiShoppingCart className="nav-item" />
          <p className="nav-NoOfItem">{props.itemCount}</p>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
