import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useSelector } from "react-redux";

function SignupFormModal() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [birthday, setBirthday] = useState('')
	const [address, setAddress] = useState('') //nullable
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	if (sessionUser) closeModal();

	function isValidEmail(email) {
		const [a, b] = email.split('@');
		if ((email.indexOf('@') === -1) || (b.indexOf('.') === -1)) {
		  return false;
		}
		if (a.length === 0 || b.length === 0) {
		  return false;
		}
		if (a.startsWith('.') || a.endsWith('.')) {
		  return false;
		}
		return true;
	  }

	const handleSubmit = async (e) => {
		e.preventDefault();

		const errorsObj = {}

		if (new Date(birthday) > new Date()) errorsObj.birthday = `Birthday can't be in the future`
		if (!isValidEmail(email)) errorsObj.email = 'Invalid Email'


		if (password === confirmPassword) {
			if (!Object.values(errorsObj).length) {
				setErrors({})
				const data = await dispatch(signUp(username, email, password, firstName, lastName, birthday, address));
				if (data) {
					setErrors(data);
					let dataErrors = {}
					errors.forEach((error, idx) => {
						const errorsSplit = error.split(' :')
						dataErrors[errorsSplit[0]] = errorsSplit[1];
					})
					setErrors(dataErrors)
				} else {
					closeModal();
				}
			} else {
				setErrors(errorsObj)
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
		<h1>Sign Up</h1>
		<form onSubmit={handleSubmit}>
		  {/* <ul>
			{errors.map((error, idx) => <li key={idx}>{error}</li>)}
		  </ul> */}
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
			type='text'
			value={address}
			onChange={e => setAddress(e.target.value)}
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
	  </>
	);
}

export default SignupFormModal;
