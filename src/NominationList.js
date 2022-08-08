function VoteResults(props) {

    return (
	<div className="vote-results">
	    <p>Yes: 0</p>
	    <p>No: 0</p>
	</div>
    )
}

function VoteBtn(props) {
    const handleSubmit = (e) => {
	e.preventDefault();
	props.sendJsonMessage({
	    action: "create_vote",
	    room_name: props.room_name,
	    nomination_title: props.nomination_title,
	    vote: props.vote,
	    request_id: new Date().getTime(),
	})
    }
    return (
	<div className={props.className}>
	    <form onSubmit={handleSubmit}>
		<button>{props.text}</button>
	    </form>
	</div>
    )
}

function Nomination(props) {
    return (
	<div className="nomination">
	    <VoteResults />
	    <div className="nomination-title">
		<h1>{props.nomination_title}</h1>
	    </div>
	    <div className="vote-btns">
		<VoteBtn vote={1} className={"yes-vote-btn"} text={"✔️"} room_name={props.room_name} sendJsonMessage={props.sendJsonMessage} nomination_title={props.nomination_title}/>
		<VoteBtn vote={0} className={"no-vote-btn"} text={"❌"} room_name={props.room_name} sendJsonMessage={props.sendJsonMessage} nomination_title={props.nomination_title}/>
	    </div>

	</div>
    );
}

function NominationList(props) {
    return (
	<div id="nomination-list">
	    {props.nominations.map((nomination) =>
		<Nomination key={nomination.title} room_name={props.room_name} nomination_title={nomination.title} sendJsonMessage={props.sendJsonMessage}/>
	    )}
	</div>
    )
}

export default NominationList;
