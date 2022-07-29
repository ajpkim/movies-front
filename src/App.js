import logo from './logo.svg';
import './App.css';
import NominationForm from './NominationForm'
import NominationList from './NominationList.js'

function App() {
    return (
	<div id="app-container">
	    <NominationForm />
	    <NominationList />
	    </div>
    );
}

export default App;
