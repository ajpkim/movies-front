import useWebSocket, { ReadyState } from 'react-use-websocket'

import logo from './logo.svg';
import './App.css';
import MovieRoom from './MovieRoom.js'

function App() {

    return (

	<MovieRoom room_name='test_room'/>
    );
}

export default App;
