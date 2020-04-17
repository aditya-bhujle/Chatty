import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyCLmN_quZSEQPnuaQ103FEVI9Mz2V8jBBo",
	authDomain: "chatty-2801f.firebaseapp.com",
	databaseURL: "https://chatty-2801f.firebaseio.com",
	projectId: "chatty-2801f",
	storageBucket: "chatty-2801f.appspot.com",
	messagingSenderId: "1089650821391",
	appId: "1:1089650821391:web:37301c31a0787817b1167a",
	measurementId: "G-HGKT0VR6RR",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.database();
