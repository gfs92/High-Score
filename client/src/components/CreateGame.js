import { useState } from "react";
import "./CreateGame.css";
import FormInput from "./FormInput";
import { API_URL } from "../constants.js";

export default function CreateGame() {
  const [scoreCount, setScoreCount] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);

  const scoreCountHandler = () => {
    setScoreCount(scoreCount + 1);
  };

  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  async function createGame(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    const { gameName, imageUpload } = formData;

    const scoreTypes = Object.keys(formData).reduce((acc, cur) => {
      if (cur.startsWith("scoreType")) {
        acc.push(formData[cur]);
      }
      return acc;
    }, []);

    const gameData = {
      gameName: gameName,
      scores: [],
      scoreTypes: scoreTypes,
      //TODO: Image upload
    };
    console.log("fd:", formData);
    // createGame(`${API_URL}`, gameData).then((data) => {
    //   console.log(data);
    // });
  };

  return (
    <div>
      <div className="Title">Add your game</div>
      <form id="createGame" className="gameForm" onSubmit={submitHandler}>
        <FormInput
          id="gameName"
          name="Game Name"
          placeholder="Your game name"
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
            {selectedFile ? selectedFile.name : "Select File"}
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
          Add additional score
        </button>

        <input type="submit" className="submitButton" value="Submit"></input>
      </form>
    </div>
  );
}
