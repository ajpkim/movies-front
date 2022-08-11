import { useState } from "react";

function NominationForm(props) {
    const [title, setTitle] = useState("");
    const handleSubmit = (e) => {
	e.preventDefault();
	props.sendJsonMessage({
	    action: "create_nomination",
	    room_name: props.room_name,
	    title: title,
	    user_id: localStorage.getItem("userId"),
	    request_id: new Date().getTime(),
	})
	e.target.reset();
    }
    const handleChange = (e) => {
	setTitle(e.target.value);
    }
    return (
	<div id="nomination-form-container">
	    <form id="nomination=form" onSubmit={handleSubmit}>
		<input placeholder="Movie Title" onChange={handleChange}/>
		<input type="submit" value="Nominate"/>
	    </form>
	</div>
    );
}

export default NominationForm;
