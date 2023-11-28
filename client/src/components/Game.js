import { useNavigate } from "react-router-dom";
import "./Game.css";
import { useState, useEffect } from "react";
import { API_URL } from "../constants.js";

export default function Game() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/games`)
      .then((response) => response.json())
      .then((data) => {
        setGames(data.games);
        console.log(data);
      });
  }, []);

  const navigate = useNavigate();

  const clickHandler = (index) => {
    navigate(`/leaderboard/${index}`);
  };

  return (
    <div>
      {games.map((game, index) => (
        <button
          onClick={() => clickHandler(index)}
          className="Game"
          key={index}>
          {game}
        </button>
      ))}
    </div>
  );
}
