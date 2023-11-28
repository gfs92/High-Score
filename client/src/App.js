import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <div>
        <header className="App-header">Hi-Score Website</header>
      </div>
      <div className="Game-Container">
        <Game />
      </div>
    </div>
  );
}

export default App;
