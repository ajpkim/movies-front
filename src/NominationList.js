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


function VoteBtn({ room_name, nomination_title, vote, className, btnText, sendMsgFunc }) {
    const handleSubmit = (e) => {
	e.preventDefault();
	sendMsgFunc({
	    action: "create_vote",
	    room_name: room_name,
	    nomination_title: nomination_title,
	    vote: vote,
	    user_id: localStorage.getItem("userId"),
	    request_id: new Date().getTime(),
	})
    }
    return (
	<div className={className}>
	    <form onSubmit={handleSubmit}>
		<button>{btnText}</button>
	    </form>
	</div>
    )
}

function VoteResults({ rating, votes }) {
    // Responsible for displaying the Nomination Rating and Total votes number
    return (
	<div className="vote-results">
	    <h3>{rating}%</h3>
	    <p>({votes.length} Votes)</p>
	</div>
    )
}

function Nomination({ room_name, votes, rating, nomination_title, sendMsgFunc }) {

    const hasVoted = (votes) => {
	const userId = localStorage.getItem('userId');
	for (const vote of votes) {
	    if (userId === vote.user) {
		return true
	    }
	}
	return false
    }

    return (
	<div className="nomination">
	    <VoteResults votes={votes} rating={rating} />
	    <div className="nomination-title">
		<h1>{nomination_title}</h1>
	    </div>
	    {!hasVoted(votes) &&
	    <div className="vote-btns">
		<VoteBtn vote={1} className={"yes-vote-btn"} btnText={"✔️"} room_name={room_name} sendMsgFunc={sendMsgFunc} nomination_title={nomination_title}/>
		<VoteBtn vote={0} className={"no-vote-btn"} btnText={"❌"} room_name={room_name} sendMsgFunc={sendMsgFunc} nomination_title={nomination_title}/>
	     </div>
	    }

	</div>
    );
}

function NominationList({ room_name, nominations, sendMsgFunc }) {
    const sortNominations = (nominations) => {
	return nominations.sort((a,b) => getNominationRating(a) < getNominationRating(b))
    }

    return (
	<div id="nomination-list">
	    {sortNominations(nominations).map((nomination) =>
		<Nomination key={nomination.title} room_name={room_name} nomination_title={nomination.title} rating={getNominationRating(nomination)} votes={nomination.votes} sendMsgFunc={sendMsgFunc}/>
				   )}
	</div>
    )
}

export default NominationList;
