import "./CreateGame.css";

export default function CreateGame() {
  const submitHandler = (event) => {
    event.preventDefault();
    const gameName = event.target.gameName.value;
    const scoreName = event.target.scoreName.value;
    //TODO: Create game in database using API
  };

  return (
    <div>
      <div className="Title">Add your game</div>
      <form id="createGame" className="gameForm" onSubmit={submitHandler}>
        <div className="formDiv">
          <label className="inputLabel">Game Name:</label>
          <input
            type="text"
            id="gameName"
            name="gameName"
            placeholder="Your game name"
            className="inputField"></input>
        </div>
        <div className="formDiv">
          <label className="inputLabel">Score Name:</label>
          <input
            type="text"
            id="scoreName"
            name="scoreName"
            placeholder="Name of score to track"
            className="inputField"></input>
        </div>
        <input type="submit" className="submitButton" value="Submit"></input>
      </form>
    </div>
  );
}
