import { useEffect, useState } from "react"
import useWebSocket, { ReadyState } from 'react-use-websocket'

import logo from './logo.svg';
import './App.css';
import NominationForm from './NominationForm'
import NominationList from './NominationList.js'
import NavBar from './NavBar.js'

// Testing stuff
const ws_url = 'ws://127.0.0.1:8000/api/test_room/'

export default function MovieRoom(props) {
    const { readyState, sendJsonMessage } = useWebSocket(ws_url, {
	onOpen: () => console.log("WS Connected!"),
	onClose: () => console.log("WS Disconnected!"),
	onMessage: (e) => {
	    const data = JSON.parse(e.data);
	    switch(data.action) {
	    case 'subscribe_to_room_nominations':
		addNomination(data);
		break;
	    case 'subscribe_to_room_votes':
		addVote(data);
		break
	    case 'retrieve':
		setNominations(data.data.nominations);
		console.log("New room data");
		break
	    default:
		console.error("Unknown message type");
		console.log(data);
		break;
	    }
	},
	shouldReconnect: (closeEvent) => true,
    })

    const [nominations, setNominations] = useState([]);

    const getRoomData = async () => {
	sendJsonMessage({
	    action: "retrieve",
	    request_id: new Date().getTime(),
	    name : props.room_name,
	    pk: 2,
	})
    }

    const addNomination = (data) => {
	console.log("New nomination");
	getRoomData();
    }

    const addVote = (data) => {
	console.log("New vote");
	getRoomData();
    }

    useEffect(() => {
	const subscribe_to_room_nominations = () => {
	    console.log("Subscribing to room nominations");
	    sendJsonMessage({
		action: "subscribe_to_room_nominations",
		request_id: new Date().getTime(),
		'room_name': props.room_name,
	    })
	}
	const subscribe_to_room_votes = () => {
	    console.log("Subscribing to room votes");
	    sendJsonMessage({
		action: "subscribe_to_room_votes",
		request_id: new Date().getTime(),
		'room_name': props.room_name,
	    })
	}

	getRoomData();
	subscribe_to_room_nominations();
	subscribe_to_room_votes();

    }, [props.room_name]);

    return (
	    <div id="app-container">
	    <NavBar />
	    <NominationForm room_name={props.room_name} sendJsonMessage={sendJsonMessage}/>
	    <NominationList room_name={props.room_name} nominations={nominations} sendJsonMessage={sendJsonMessage}/>
	    </div>
    )

}
