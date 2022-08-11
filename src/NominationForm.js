import { useState } from "react";

function NominationForm(props) {
    const [nomination, setNomination] = useState("");
    const handleSubmit = (e) => {
	e.preventDefault();
	props.sendJsonMessage({
	    action: "create_nomination",
	    room_name: props.room_name,
	    title: nomination,
	    user_id: localStorage.getItem("userId"),
	    request_id: new Date().getTime(),
	})
    }
    const handleChange = (e) => {
	setNomination(e.target.value);
    }
    return (
	<div id="nomination-form-container">
	    <form id="nomination=form" onSubmit={handleSubmit}>
		<input placeholder="Movie Nomination" onChange={handleChange}/>
		<input type="submit" value="Nominate"/>
	    </form>
	</div>
    );
}

export default NominationForm;
