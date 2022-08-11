import { useEffect } from "react"

const createRoomURL = 'http://localhost:8000/api/rooms/create/'

function CreateRoomBtn(props) {

    const handleClick = () => {
	let room_url;
	const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'LOL' })  // name is filled in with UUID on server
	};
	fetch(createRoomURL, requestOptions)
	    .then((response) => {
		response.json()
		    .then((json_data) => {
			window.location = "http://localhost:3000/rooms/" + json_data.name;
		    })
	    })
    }

    return (
	// <div id="create-room-btn-container">
	<button
	onClick={() => handleClick()}
	name="create-room-btn">
	Create Movie Room
	</button>
	// </div>
    )
}

export default function Home() {

    return (
	<>
	    <main>
		<h2>Find a movie everyone wants to watch, <i>quickly</i>.</h2>
		<p>
		    No more endless catalogue scrolling and forgetting what's been said.
		</p>
		<h3>
		    Nominate, Vote, Watch.
		</h3>
		<CreateRoomBtn />

	    </main>
	</>
    );
}
