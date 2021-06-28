import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

//Components
import SearchBar from "./components/SearchBar";
import MainNavigation from "./components/MainNavigation";

function App() {
	return (
		<div className="container mt-3">
			<MainNavigation />
			<SearchBar />
		</div>
	);
}

export default App;
