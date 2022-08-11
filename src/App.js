import { useEffect } from "react"
import { Routes, Route, Link } from "react-router-dom";
import useWebSocket, { ReadyState } from 'react-use-websocket'

import logo from './logo.svg';
import './App.css';
import MovieRoom from './MovieRoom.js'
import NavBar from './NavBar.js'
import Home from './Home.js'
import About from './About.js'

const initializeUserURL = 'http://localhost:8000/api/users/create/'

function App() {

    useEffect(() => {
	// TODO: ASYNC/AWAIT
	const initializeUser = () => {
	    fetch(initializeUserURL, {method: "post"})
		.then((response) => {
		    response.json().then((json_data) => {
			localStorage.setItem("userId", json_data.id);
		    })
		})
	}
	if (localStorage.getItem("userId") === null) {
	    console.log("Initializing User");
	    initializeUser();
	} else {
	    console.log("Welcome user " + localStorage.getItem("userId"));
	}
    }, []);

    return (
	    <div className="App">
	    <div className="header">
	    <h1>Let's Watch a Movie!</h1>
	</div>
	    <NavBar />
	<Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
	    <Route path="/rooms/test_room" element={<MovieRoom room_name="test_room" />} />
	</Routes>
	</div>
    );
}

export default App;
