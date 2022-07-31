import useWebSocket, { ReadyState } from 'react-use-websocket'

import logo from './logo.svg';
import './App.css';
import NominationForm from './NominationForm'
import NominationList from './NominationList.js'
import NavBar from './NavBar.js'

// Testing stuff
import nominations from './json/test-nominations.json'
const ws_path = 'ws://127.0.0.1:8000/ws/movie_selection/ABC/'

function MovieRoom(props) {
    const { readyState } = useWebSocket(ws_path, {
	onOpen: () => console.log("WS Connected!"),
	onClose: () => console.log("WS Disconnected!"),
	onMessage: (e) => {
	    console.log("WS received msg: " + e.data);
	}
    });
    const { sendJsonMessage } = useWebSocket(ws_path);
    const connectionStatus = {
	[ReadyState.CONNECTING]: 'Connecting',
	[ReadyState.OPEN]: 'Open',
	[ReadyState.CLOSING]: 'Closing',
	[ReadyState.CLOSED]: 'Closed',
	[ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
	<div id="app-container">
	    <NavBar />
	    <NominationForm sendJsonMessage={sendJsonMessage}/>
	    <NominationList nominations={nominations}/>
	</div>
    )







}

export default MovieRoom
