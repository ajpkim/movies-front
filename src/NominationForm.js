/*
  This component provides a movie title autocompletion input interface for the
  nomination process and handles the creation of new nominations via WebSocket API.
 */

import { useEffect, useState } from "react"

function AutoCompleteForm({ formId, elements, handleSubmit, sendMsgFunc }) {

    const [input, setInput] = useState("");
    const [matches, setMatches] = useState([]);
    const [active, setActive] = useState(-1);
    const [visible, setVisible] = useState(false);

    const handleChange = (e) => {
	// The order here matters (it looks like repeated work), not sure what happens here and the impact on order/results
	const text = e.currentTarget.value;
	const newMatches = elements.filter(
	    element => element.toLowerCase().indexOf(text.toLowerCase()) > -1
	);
	setActive(-1);
	setMatches(newMatches);
	setVisible(true);
	setInput(e.target.value);
    }

    const handleClick = (e) => {
	setActive(-1);
	setMatches([]);
	setVisible(false);
	setInput(e.currentTarget.innerText)
    }

    const handleKeyDown = (e) => {
	// 13 = enter key
	if (e.keyCode === 13) {
	    if (active >= 0) {
		setInput(matches[active]);
	    }
	    setVisible(false);
	    // 38 = up arrow
	} else if (e.keyCode === 38) {
	    return (active === 0) ? setActive(-1) : setActive(active - 1)
	    // 40 = down arrow
	} else if (e.keyCode === 40) {
	    return (active - 1 === matches.length) ? null : setActive(active + 1)
	}
    }

    const outterHandleSubmit = (e) => {
	console.log("YOOOO");
	e.preventDefault();
	handleSubmit(input, sendMsgFunc);
	e.target.reset();
    }

    const renderAutoComplete = () => {
	if (visible && input) {
	    return (
		<ul className="autocomplete">
 		    {matches.map((match, i) => {
			let className = (active === i) ? "active-match" : "match"
			return (
			    <li className={className} key={match} onClick={handleClick}>
 				{match}
 			    </li>
			)
 		    })
 		    }
 		</ul>
 	    )
 	} else {
	    return <></>
 	}
    }

    return (
 	<>
	    <form id={formId} onSubmit={outterHandleSubmit}>

 		<input
		    type="text"
		    onChange={handleChange}
		    onKeyDown={handleKeyDown}
		    value={input}
		/>
 		{renderAutoComplete()}
	    </form>
	</>
    );
}


function NominationForm({ room_name, titles, sendMsgFunc }) {
    const innerHandleSubmit = (value, sendMsgFunc) => {
	sendMsgFunc({
	    action: "create_nomination",
	    room_name: room_name,
	    title: value,
	    user_id: localStorage.getItem("userId"),
	    request_id: new Date().getTime(),
	})
    }

    return (
	<div id="nomination-form-container">
	    <AutoCompleteForm formId={"HAHA"} elements={titles} handleSubmit={innerHandleSubmit} sendMsgFunc={sendMsgFunc}/>
 	</div>
    );
}

export default NominationForm;
