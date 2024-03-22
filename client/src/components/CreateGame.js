import { useState } from "react";
import "./CreateGame.css";
import FormInput from "./FormInput";
import { API_URL } from "../constants.js";
import { useNavigate } from "react-router-dom";

export default function CreateGame() {
  const [scoreCount, setScoreCount] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  const scoreCountHandler = () => {
    if (scoreCount < 5) {
      setScoreCount(scoreCount + 1);
    }
  };

  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  async function createGame(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      body: data,
    });
    const jsonResponse = await response.json();

    if (!response.ok) {
      if (jsonResponse.message.code === 11000) {
        throw new Error("this game name or link already exists");
      } else if (jsonResponse.message.name === "ValidationError") {
        throw new Error("a name for your game and score types are required");
      }
    }
    return jsonResponse;
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    const { gameName, gameURL, imageUpload } = formData;

    const scoreTypes = Object.keys(formData).reduce((acc, cur) => {
      if (cur.startsWith("scoreType")) {
        acc.push(formData[cur]);
      }
      return acc;
    }, []);

    const gameData = new FormData();
    gameData.append("gameName", gameName);
    gameData.append("scoreTypes", scoreTypes);
    if (gameURL) {
      gameData.append("gameURL", gameURL);
    }
    if (selectedFile) {
      gameData.append("imageUpload", imageUpload);
    }

    try {
      const data = await createGame(API_URL, gameData);
      console.log("gamedata:", data);
      navigate("/CreateGameSuccess", { state: { gameId: data.data.game._id } });
    } catch (err) {
      console.error("Error creating game:", err.message);
      navigate("/CreateGameError", { state: { errorMessage: err.message } });
    }
  };

  return (
    <div>
      <div className="Title">Add your game</div>

      <form
        id="createGame"
        className="gameForm"
        encType="multipart/form-data"
        onSubmit={submitHandler}>
        <FormInput
          id="gameName"
          name="Game Name"
          placeholder="Your game name"
        />
        <FormInput
          id="gameURL"
          name="Link to Game"
          placeholder="Game URL (Optional)"
        />
        <div className="formDiv">
          <label className="inputLabel">Image Upload :</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            id="imageUpload"
            name="imageUpload"
            className="fileUpload"
            onChange={fileChangeHandler}
          />
          <label htmlFor="imageUpload" className="fileLabel">
            {selectedFile ? selectedFile.name : "Select File (Optional)"}
          </label>
        </div>
        {[...Array(scoreCount)].map((_, i) => (
          <FormInput
            key={i + 1}
            id={`scoreType${i + 1}`}
            name={`Score Name ${i + 1}`}
            placeholder="Name of score to track"
          />
        ))}
        <button
          className="submitButton"
          type="button"
          onClick={scoreCountHandler}>
          {scoreCount < 5
            ? "Add additional score"
            : "Maximum number of Score Names reached"}
        </button>

        <input type="submit" className="submitButton" value="Submit"></input>
      </form>
    </div>
  );
}
