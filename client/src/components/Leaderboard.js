import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Leaderboard.css";
import { API_URL } from "../constants.js";

export default function Leaderboard() {
  const gameId = useParams();
  const [game, setGame] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/games/${gameId.id}`)
      .then((response) => response.json())
      .then((data) => {
        setGame(data.data.game);
      });
  }, [gameId]);

  return (
    <div className="Leaderboard">
      <div>Leaderboard for {game.name}</div>
    </div>
  );
}
