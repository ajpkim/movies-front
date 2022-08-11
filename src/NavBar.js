import { Link } from "react-router-dom";

function NavBar(props) {
    return (
	<nav className="navbar">
	    <div className="links">
		<Link to="/">Home</Link>
		<Link to="/about">About</Link>
		<Link to="/rooms/test_room">test_room</Link>
	    </div>
	</nav>
    )
}

export default NavBar
