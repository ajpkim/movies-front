import { Routes, Route, Link } from "react-router-dom";

import useWebSocket, { ReadyState } from 'react-use-websocket'

import logo from './logo.svg';
import './App.css';
import MovieRoom from './MovieRoom.js'
import NavBar from './NavBar.js'
import Home from './Home.js'
import About from './About.js'

function App() {
    return (
	<div className="App">
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
