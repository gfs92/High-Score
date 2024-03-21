import { useNavigate } from "react-router-dom";
import "./CreateGameSuccess.css";

export default function CreateGameSuccess() {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/");
  };

  return (
    <div className="createGameSuccess">
      <div>Success! Your game has been created</div>
      <button className="returnButton" onClick={clickHandler}>
        Click Here to return home
      </button>
    </div>
  );
}
