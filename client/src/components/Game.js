import { useNavigate } from "react-router-dom";
import "./Game.css";
import { useState, useEffect } from "react";
import { API_URL } from "../constants.js";

export default function Game() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}`)
      .then((response) => response.json())
      .then((res) => {
        setGames(res.data.games);
      });
  }, []);

  const navigate = useNavigate();

  const clickHandler = (gameId) => {
    navigate(`/leaderboard/${gameId}`);
  };

  return (
    <div>
      {games &&
        games.map((game, index) => (
          <button
            onClick={() => clickHandler(game._id)}
            className="Game"
            key={index}>
            {game.name}
          </button>
        ))}
    </div>
  );
}
