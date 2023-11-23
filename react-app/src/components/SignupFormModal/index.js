import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";

function SignupFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState(""); //nullable
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  if (sessionUser) closeModal();

  function isValidEmail(email) {
    const [a, b] = email.split("@");
    if (email.indexOf("@") === -1 || b.indexOf(".") === -1) {
      return false;
    }
    if (a.length === 0 || b.length === 0) {
      return false;
    }
    if (a.startsWith(".") || a.endsWith(".")) {
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    let errorsObj = {};

    if (new Date(birthday) > new Date())
      errorsObj.birthday = `Birthday can't be in the future`;
    if (!isValidEmail(email)) errorsObj.email = "Invalid Email";

    if (password !== confirmPassword) {
      errorsObj.password =
        "Confirm Password field must be the same as the Password field";
    }

    if (!Object.values(errorsObj).length) {
      const data = await dispatch(
        signUp(
          username,
          email,
          password,
          firstName,
          lastName,
          birthday,
          address
        )
      );
      if (data) {
        let dataErrors = {};
        data.forEach((error) => {
          const errorsSplit = error.split(" :");
          dataErrors[errorsSplit[0]] = errorsSplit[1];
        });
        errorsObj = { ...errorsObj, ...dataErrors };
      } else {
        closeModal();
      }
    }

    if (Object.values(errorsObj).length) {
      setErrors(errorsObj);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Birthday
          <input
            type="date"
            value={birthday}
            onChange={(e) => {
              setBirthday(e.target.value);
            }}
            required
          ></input>
          {errors.birthday && <p>{errors.birthday}</p>}
        </label>
        <label>
          Your Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Sign Up</button>
      </form>

      <OpenModalButton
        buttonText="Log In"
        // onItemClick={closeMenu}
        modalComponent={<LoginFormModal />}
      />
    </>
  );
}

export default SignupFormModal;
