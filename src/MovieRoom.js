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
		console.log("NEW NOMINATION");
		addNomination(data);
		break;
	    case 'subscribe_to_room_votes':
		addVote(data);
		console.log("NEW VOTE");
		break
	    case 'retrieve':
		setNominations(data.data.nominations);
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

    useEffect(() => {
	const fetchData = async () => {
	    sendJsonMessage({
		action: "retrieve",
		request_id: new Date().getTime(),
		'name': props.room_name,
		pk: 2
	    })
	}
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

	fetchData();
	subscribe_to_room_nominations();
	subscribe_to_room_votes();

    }, [props.room_name]);



    const addNomination = (data) => {
	const nomination = {
	    'title': data.title,
	    'votes': data.votes,
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



// const [functionCount,setFunctionCount] = useState(0);

    // useEffect(() => {
    //     if (functionCount === 0) { MyFunction() }
    // })

    // const MyFunction = () => {
    // 	subscribe_to_room_nominations();
    // 	subscribe_to_room_votes();
    // 	setFunctionCount(functionCount + 1);
    // }
