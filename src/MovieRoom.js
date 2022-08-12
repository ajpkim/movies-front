import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import logo from './logo.svg';
import './App.css';
import NominationForm from './NominationForm'
import NominationList from './NominationList.js'
import NavBar from './NavBar.js'

export default function MovieRoom(props) {
    const { room_name } = useParams();
    const ws_url = 'ws://127.0.0.1:8000/api/rooms/';

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
		// This is where we could do more processing of the nomination data if we want
		if (data.data) {
		    setNominations(data.data.nominations);
		    console.log("New room data");
		}
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
	    name: room_name,
	})
    }
    const addNomination = (data) => {
	getRoomData();
    }
    const addVote = (data) => {
	getRoomData();
    }
    useEffect(() => {
	const subscribe_to_room_nominations = () => {
	    sendJsonMessage({
		action: "subscribe_to_room_nominations",
		'room_name': room_name,
		request_id: new Date().getTime(),
	    })
	}
	const subscribe_to_room_votes = () => {
	    sendJsonMessage({
		action: "subscribe_to_room_votes",
		'room_name': room_name,
		request_id: new Date().getTime(),
	    })
	}
	getRoomData();
	subscribe_to_room_nominations();
	subscribe_to_room_votes();

    }, [room_name]);

    return (

	    <div id="movie-room-container">
	    <NominationForm room_name={room_name} sendJsonMessage={sendJsonMessage}/>
	    <NominationList room_name={room_name} nominations={nominations} sendJsonMessage={sendJsonMessage}/>
	    </div>
    )

}
