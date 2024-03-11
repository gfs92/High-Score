import "./App.css";
import Game from "./components/Game";
import HeaderButtons from "./components/HeaderButtons";

function App() {
  return (
    <div className="App">
      <HeaderButtons />
      <div>
        <p className="App-title">Hi-Score Website</p>
      </div>
      <div className="Game-Container">
        <Game />
      </div>
    </div>
  );
}

export default App;
