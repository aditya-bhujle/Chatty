import React from "react";
import Form from "../components/form";
import { signup } from "../helpers/auth";

function SignUp() {
	return <Form page="signup" helperAuth={signup}/>;
}

export default SignUp;
