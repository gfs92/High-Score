import { useNavigate } from "react-router-dom";
import "./HeaderButtons.css";

export default function HeaderButtons() {
  const navigate = useNavigate();

  const createGameHandler = () => {
    navigate("/createGame");
  };
  return (
    <div className="App-header">
      <button className="createGame" onClick={createGameHandler}>
        Add Your Game
      </button>
      <button>Settings</button>
    </div>
  );
}
