function VoteResults(props) {

    return (
	<div className="vote-results">
	    <p>Yes: 0</p>
	    <p>No: 0</p>
	</div>
    )
}
function YesVoteBtn(props) {

    return (
	<div className="yes-btn">
	    <form>
		<button>YES</button>
	    </form>
	</div>
    )
}

function NoVoteBtn(props) {

    return (
	<div className="no-btn">
	    <form>
		<button>NO</button>
	    </form>
	</div>
    )
}

function Nomination(props) {

    return (
	<div className="nomination">
	    <VoteResults />
	    <div className="nomination-title">
		A MOVIE TITLE
	    </div>
	    <div className="vote-btns">
		<YesVoteBtn />
		<NoVoteBtn />
	    </div>

	</div>
    );
}

function NominationList(props) {

    return (
	<div id="nomination-list">
	    <Nomination />
	    <Nomination />
	    <Nomination />
	</div>
    )
}

export default NominationList;
