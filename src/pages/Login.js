import React from "react";
import Form from "../components/form";
import { signin } from "../helpers/auth";

function Login() {
	return <Form page="login" helperAuth={signin}/>;
}

export default Login;
