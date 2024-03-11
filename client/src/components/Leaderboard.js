import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Leaderboard.css";
import { API_URL } from "../constants.js";

export default function Leaderboard() {
  const { id } = useParams();
  const [game, setGame] = useState({ name: "", scores: [] });

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((response) => response.json())
      .then((res) => {
        setGame(res.data.game);
      });
  }, [id]);

  const sortedScores = [...game.scores].sort((a, b) => b.score - a.score);

  return (
    <div className="Leaderboard">
      <div className="Gametitle">Leaderboard for {game.name}</div>
      <div className="Scoretrack">Score to be tracked</div>
      <ul className="ScoreList">
        {sortedScores.map(({ username, score }, index) => (
          <li key={index} className="ScoreItem">
            <span className="Username">{username}:</span>
            <span className="Score">{score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
