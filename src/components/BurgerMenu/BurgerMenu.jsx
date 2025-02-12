import React from "react";
import { NavLink } from "react-router-dom";
import "./BurgerMenu.css";

function BurgerMenu({ isOpen, handleClose, isLoggedIn, handleSigninClick }) {
  return (
    <div className={`burger-menu ${isOpen ? "burger-menu_opened" : ""}`}>
      <div className="burger-menu__container"></div>
    </div>
  );
}

export default BurgerMenu;
