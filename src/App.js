import React, { useState, useEffect } from "react";
import {
	Route,
	BrowserRouter as Router,
	Switch,
	Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { auth } from "./services/firebase";
import "./styles.css";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				authenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: "/login", state: { from: props.location } }}
					/>
				)
			}
		/>
	);
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				authenticated ? <Redirect to="/chat" /> : <Component {...props} />
			}
		/>
	);
}

function App() {
	const [authentication, setAuthentication] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		auth().onAuthStateChanged((user) => {
			setAuthentication(user);
			setLoading(false);
		});
	});

	return loading ? (
		<h2>Loading...</h2>
	) : (
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<PrivateRoute
					path="/chat"
					authenticated={authentication}
					component={Chat}
				/>
				<PublicRoute
					path="/signup"
					authenticated={authentication}
					component={Signup}
				/>
				<PublicRoute
					path="/login"
					authenticated={authentication}
					component={Login}
				/>
			</Switch>
		</Router>
	);
}

export default App;
