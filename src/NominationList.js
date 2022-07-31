// function VoteResults(props) {

//     return (
// 	<div className="vote-results">
// 	    <p>Yes: 0</p>
// 	    <p>No: 0</p>
// 	</div>
//     )
// }

function YesVoteBtn(props) {
    const handleSubmit = (e) => {
	e.preventDefault();
	props.sendJsonMessage({
	    type: "vote",
	    vote: 1,
	    title: props.title
	})
    }
    return (
	<div className="vote-btn">
	    <form onSubmit={handleSubmit}>
		<button>✔️</button>
	    </form>
	</div>
    )
}

function NoVoteBtn(props) {
    const handleSubmit = (e) => {
	e.preventDefault();
	props.sendJsonMessage({
	    type: "vote",
	    vote: 0,
	    title: props.title
	})
    }
    return (
	<div className="vote-btn">
	    <form onSubmit={handleSubmit}>
		<button>❌</button>
	    </form>
	</div>
    )
}

function VetoBtn(props) {

    return (
	<div className="veto-btn">
	    <form>
		<button>VETO</button>
	    </form>
	</div>
    )
}

function Nomination(props) {

    return (
	<div className="nomination">
	    {/* <VoteResults /> */}
	    <div className="nomination-title">
		<h1>{props.title}</h1>
	    </div>
	    <div className="vote-btns">
		<YesVoteBtn sendJsonMessage={props.sendJsonMessage} title={props.title}/>
		<NoVoteBtn sendJsonMessage={props.sendJsonMessage} title={props.title}/>
	    </div>

	</div>
    );
}

function NominationList(props) {

    // TODO: Fix key
    return (
	<div id="nomination-list">
	    {props.nominations.map((nomination) =>
		<Nomination key={nomination.title} title={nomination.title} sendJsonMessage={props.sendJsonMessage}/>
	    )}
	</div>
    )
}

export default NominationList;
