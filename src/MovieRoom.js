import { useEffect, useState} from "react"
import useWebSocket, { ReadyState } from 'react-use-websocket'

import logo from './logo.svg';
import './App.css';
import NominationForm from './NominationForm'
import NominationList from './NominationList.js'
import NavBar from './NavBar.js'

// Testing stuff
import test_nominations from './json/test-nominations.json'
const ws_path = 'ws://127.0.0.1:8000/ABC/'
const test_room_url = 'http://localhost:8000/rooms/2/'
const room_api_base_url = 'http://localhost:8000/rooms/'

function MovieRoom(props) {
    const { readyState } = useWebSocket(ws_path, {
	onOpen: () => console.log("WS Connected!"),
	onClose: () => console.log("WS Disconnected!"),
	onMessage: (e) => {
	    const data = JSON.parse(e.data);
	    switch(data.type) {
	    case 'nomination':
		addNomination(data);
		break;
	    case 'vote':
		addVote(data);
		break
	    default:
		console.error("Unknown message type");
		break;
	    }
	}
    })

    const { sendJsonMessage } = useWebSocket(ws_path);
    const [nominations, setNominations] = useState([]);

    useEffect(() => {
	const fetchData = async () => {
	    const response = await fetch(room_api_base_url + '2' + '/');
	    const newData = await response.json();
	    setNominations(newData.nominations);
	    console.log(newData.nominations);
	};
	fetchData();
    }, [props.room_name]);


    const addNomination = (data) => {
	const nomination = {
	    'title': data.title,
	    'votes_yes': data.votes_yes,
	    'votes_no': data.votes_no
	}
	console.log("new nomination: " + nomination);
	setNominations(nominations => [...nominations, nomination]);
    }
    const addVote = (data) => {
	console.log("Processing a new vote");
    }

    return (
	<div id="app-container">
	    <NavBar />
	    <NominationForm sendJsonMessage={sendJsonMessage}/>
	    <NominationList nominations={nominations} sendJsonMessage={sendJsonMessage}/>
	</div>
    )







}

export default MovieRoom
