import React, { useState, useEffect } from "react";
import { auth, db } from "../services/firebase";

function Chat() {
	const [user, setUser] = useState(auth().currentUser);
	const [chats, setChats] = useState([]);
	const [content, setContent] = useState("");
	const [readError, setReadError] = useState(null);
	const [writeError, setWriteError] = useState(null);

	useEffect(() => {
		setReadError(null);
		try {
			db.ref("chats").on("value", (snapshot) => {
				let importedChats = [];
				snapshot.forEach((snap) => {
					importedChats.push(snap.val());
                });
                console.log(importedChats);
				setChats(importedChats);
			});
		} catch (error) {
			setReadError(error.message);
		}
	}, [setReadError]);

	async function handleSubmit(event) {
		event.preventDefault();
		setWriteError(null);
		try {
			await db.ref("chats").push({
				content: content,
				timestamp: Date.now(),
				uid: user.uid,
			});
			setContent("");
		} catch (error) {
			setWriteError(error.message);
		}
	}

	return (
		<div>
			<div className="chats">
				{chats.map((chat) => 
					<p key={chat.timestamp}>{chat.content}</p>
				)}
			</div>
			<form onSubmit={handleSubmit}>
				<input
					onChange={(event) => setContent(event.target.value)}
					value={content}
				></input>
				{writeError ? <p>{writeError}</p> : null}
				<button type="submit">Send</button>
			</form>
			<div>
				Login in as: <strong>{user.email}</strong>
			</div>
		</div>
	);
}

export default Chat;
