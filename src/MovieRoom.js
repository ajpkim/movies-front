import { useEffect, useState} from "react"
import useWebSocket, { ReadyState } from 'react-use-websocket'

import logo from './logo.svg';
import './App.css';
import NominationForm from './NominationForm'
import NominationList from './NominationList.js'
import NavBar from './NavBar.js'

// Testing stuff
const ws_path = 'ws://127.0.0.1:8000/api/test_room/'

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
		console.log(e.data);
		break;
	    }
	}
    })

    const { sendJsonMessage } = useWebSocket(ws_path);
    const [nominations, setNominations] = useState([]);

    useEffect(() => {
	const fetchData = async () => {
	    const response = await fetch('http://localhost:8000/api/rooms/test_room/');
	    const newData = await response.json();
	    setNominations(newData.nominations);
	    console.log(newData.nominations);
	};
	fetchData();
    }, [props.room_name]);

    //////////
    // Testing the DCRF API/

    const foo = () => {
	console.log("SENDING retrieve (GET) request to server");
	const msg = {
	    action: "retrieve",
	    request_id: new Date().getTime(),
	    'room_name': props.room_name,
	    pk: 2
	}
	sendJsonMessage(msg);
    }

    const subscribe_to_nomination = () => {
	console.log("Subscirbing to nomination");
	sendJsonMessage({
	    action: "subscribe_to_nomination",
	    request_id: new Date().getTime(),
	    'room_name': props.room_name,
	    'title': 'Moonrise Kingdom',
	})
    }

    const subscribe_to_room = () => {
	console.log("Subscirbing to room");
	sendJsonMessage({
	    action: "subscribe_to_room",
	    request_id: new Date().getTime(),
	    'name': props.room_name,
	});
    }
    const [functionCount,setFunctionCount] = useState(0);

    useEffect(() => {
        if (functionCount === 0) { MyFunction() }
    })

    const MyFunction = () => {
	foo();
	subscribe_to_nomination();
	// subscribe_to_room();
	setFunctionCount(functionCount + 1);
    }

    //////////


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
