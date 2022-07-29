import logo from './logo.svg';
import './App.css';
import NominationForm from './NominationForm'
import NominationList from './NominationList.js'
import NavBar from './NavBar.js'

function App() {
    return (
	    <div id="app-container">
	    <NavBar />
	    <NominationForm />
	    <NominationList />
	    </div>
    );
}

export default App;
