import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav id="navbar">
      <NavLink exact to="/restaurants" id="logo">
        <img src="https://savoryscoot.s3.amazonaws.com/src-images/SavoryScooter.svg" />
        <span>
          <span style={{ fontWeight: 500 }}>Savory</span>
          <span style={{ fontWeight: 600 }}>Scoot</span>
        </span>
      </NavLink>

      {isLoaded && <ProfileButton user={sessionUser} />}
    </nav>
  );
}

export default Navigation;
