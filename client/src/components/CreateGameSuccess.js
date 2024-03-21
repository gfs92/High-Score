import { useNavigate, useLocation } from "react-router-dom";
import "./CreateGameSuccess.css";
import PostmanButton from "./PostmanButton";

export default function CreateGameSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const gameId = location.state.gameId;

  const clickHandler = () => {
    navigate("/");
  };

  return (
    <div className="createGameSuccess">
      <div>Success! Your game has been created</div>
      <div>Your game ID is {gameId}</div>
      <button className="returnButton" onClick={clickHandler}>
        Click Here to return home
      </button>
      <div className="postmanDiv">
        <PostmanButton />
      </div>
    </div>
  );
}
