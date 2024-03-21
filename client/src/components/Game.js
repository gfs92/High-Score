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
    <div className="gameCards">
      {games &&
        games.map((game, index) => (
          <div key={game._id}>
            <p className="gameName">{game.gameName}</p>
            <button
              onClick={() => clickHandler(game._id)}
              className="Game"
              style={{ backgroundImage: `url(${game.imageUpload})` }}></button>
          </div>
        ))}
    </div>
  );
}
