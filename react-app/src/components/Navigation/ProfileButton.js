import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CartModal from "../Cart/CartModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const ulRef = useRef();
  const [cartQty, setCartQty] = useState(0);
  const cart = useSelector((state) => state.cart);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    const cartLength = Object.values(cart).reduce((acc, curr) => {
      acc = parseInt(acc) + parseInt(curr.qty);
      return acc;
    }, 0);

    setCartQty(cartLength);
  }, [cart]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    if (user) setIsUser(true);
    else setIsUser(false);
  }, [user]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const userClassName = isUser ? "" : "hidden";

  return (
    <div>
      <OpenModalButton
        buttonText={`Cart (${cartQty})`}
        onItemClick={closeMenu}
        modalComponent={<CartModal />}
      />

      <div className={userClassName}>
        <button onClick={openMenu}>
          <i className="fas fa-user-circle" />
        </button>
        <ul className={ulClassName} ref={ulRef}>
          <li>{user?.username}</li>
          <li>{user?.email}</li>
          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        </ul>
      </div>

      {!user && (
        <>
          <OpenModalButton
            buttonText="Log In"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />

          <OpenModalButton
            buttonText="Sign Up"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
          />
        </>
      )}
    </div>
  );
}

export default ProfileButton;
