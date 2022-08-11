import { useEffect } from "react"

function CreateRoomBtn(props) {

    // const generateRoomName(props
    return (
	// <div id="create-room-btn-container">
	<button
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
