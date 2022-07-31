import { useState } from "react";

function NominationForm(props) {
    const [nomination, setNomination] = useState("");
    const handleSubmit = (e) => {
	e.preventDefault();
	props.sendJsonMessage({
	    type: "new_nomination",
	    title: nomination,
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
