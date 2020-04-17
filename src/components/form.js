import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signinWithGoogle, signInWithGithub } from "../helpers/auth";

function Form(props) {
	const [error, setError] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const isSignup = props.page === "signup";
	const signUpText = isSignup ? "Sign up" : "Log in";

	async function handleSubmit(event) {
		event.preventDefault();
		setError("");
		try {
			await props.helperAuth(email, password);
		} catch (formError) {
			setError(formError.message);
		}
	}

    async function thirdPartySignIn(auth) {
        try {
			await auth();
		} catch (formError) {
			setError(formError.message);
		}
    }

	return (
		<form onSubmit={handleSubmit}>
			<h1>
				{isSignup ? "Sign Up to" : "Login to"}
				<Link to="/">Chatty</Link>
			</h1>
			<p>
				Fill in the form below to {isSignup ? "create an" : "login to your"}{" "}
				account.
			</p>
			<div>
				<input
					placeholder="Email"
					name="email"
					type="email"
					onChange={(event) => setEmail(event.target.value)}
					value={email}
				></input>
			</div>
			<div>
				<input
					placeholder="Password"
					name="password"
					onChange={(event) => setPassword(event.target.value)}
					value={password}
					type="password"
				></input>
			</div>
			<div>
				{error ? <p>{error}</p> : null}
				<button type="submit">{signUpText}</button>
				<p>Or</p>
				<button onClick={() => thirdPartySignIn(signinWithGoogle)} type="button">
					{signUpText} with Google
				</button>
                <button onClick={() => thirdPartySignIn(signInWithGithub)} type="button">
					{signUpText} with Github
				</button>
			</div>
			<hr />
			{isSignup ? (
				<p>
					Already have an account?
					<Link to="/login">Login</Link>
				</p>
			) : (
				<p>
					Don't have an account?
					<Link to="/signup">Sign up</Link>
				</p>
			)}
		</form>
	);
}

export default Form;
