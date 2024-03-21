import { useNavigate, useLocation } from "react-router-dom";

export default function CreateGameError() {
  const navigate = useNavigate();
  const location = useLocation();
  const errorMessage = location.state.errorMessage;

  const clickHandler = () => {
    navigate("/CreateGame");
  };

  return (
    <div className="createGameSuccess">
      <div>Your game has not been created because {errorMessage}</div>
      <button className="returnButton" onClick={clickHandler}>
        Click Here to go back to form
      </button>
    </div>
  );
}
