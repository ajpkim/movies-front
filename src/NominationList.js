// TODO: Should this type of vote and rating processing live outside the component and just be passed as props?
// This is written to be generalizable to other voting schemes beyond just 0s and 1s
// TODO: decide where these nomination stat related functions should live.
const parseVotes = (votes) => {
    let counts = new Map();
    votes.map((v) => {
	const val = counts.has(v.vote) ? counts.get(v.vote) + 1 : 1
	counts.set(v.vote, val)
    })
    return counts
}

const getNominationRating = (nomination) => {
    // For now this just handles YES and NO votes as 1's and 0s
    const counts = parseVotes(nomination.votes);
    let rating =  counts.has(1) ? counts.get(1) / nomination.votes.length : 0
    rating = Math.round(rating * 100);
    return rating
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

function VoteResults(props) {
    // Responsible for displaying the Nomination Rating and Total votes number
    return (
	<div className="vote-results">
	    <h3>Group Rating {props.rating}%</h3>
	    <p>({props.votes.length} Votes)</p>
	</div>
    )
}
function Nomination(props) {
    return (
	<div className="nomination">
	    <VoteResults votes={props.votes} rating={props.rating} />
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
    const sortNominations = (nominations) => {
	return nominations.sort((a,b) => getNominationRating(a) < getNominationRating(b))
    }

    return (
	<div id="nomination-list">
	    {sortNominations(props.nominations).map((nomination) =>
		<Nomination key={nomination.title} room_name={props.room_name} nomination_title={nomination.title} rating={getNominationRating(nomination)} votes={nomination.votes} sendJsonMessage={props.sendJsonMessage}/>
				   )}
	</div>
    )
}

export default NominationList;
