import "./App.css";
import Game from "./components/Game";
import HeaderButtons from "./components/HeaderButtons";

function App() {
  return (
    <div className="App">
      <div>
        <HeaderButtons />
        <p className="appTitle">Hi-Score Website</p>
      </div>
      <div className="gameContainer">
        <Game />
      </div>
    </div>
  );
}

export default App;
