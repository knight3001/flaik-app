import logo from "./logo.svg";
import "./App.css";
import FlaikMap from "./maps/FlaikMap";

function App() {
  return (
    <div className="App">
      <div className="App-Main">
        <FlaikMap isEditable={true} />
      </div>
    </div>
  );
}

export default App;
