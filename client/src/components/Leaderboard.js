import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Leaderboard.css";
import { API_URL } from "../constants.js";

export default function Leaderboard() {
  const { id } = useParams();
  const [game, setGame] = useState({ name: "", scores: [] });
  const [scoreTypes, setScoreTypes] = useState([]);
  const [groupedScores, setGroupedScores] = useState([]);
  const [sortConfig, setSortConfig] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((response) => response.json())
      .then((res) => {
        setGame(res.data.game);
        const scoreColumns = res.data.game.scoreTypes;
        const groupedScores = res.data.game.scores.reduce((acc, cur) => {
          const { username, scoreType, score } = cur;
          const existingUser = acc.find((user) => user.username === username);

          if (existingUser) {
            existingUser.scores[scoreType] = score;
          } else {
            const newUser = {
              username: username,
              scores: { [scoreType]: score },
            };
            acc.push(newUser);
          }

          return acc;
        }, []);
        setGroupedScores(groupedScores);
        setScoreTypes(scoreColumns);
      });
  }, [id]);

  const sortHandler = (scoreType) => {
    let direction = "desc";
    if (sortConfig.scoreType === scoreType && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ scoreType, direction });
    const sortedScores = [...groupedScores].sort((a, b) => {
      const scoreA = a.scores[scoreType];
      const scoreB = b.scores[scoreType];
      return direction === "asc" ? scoreA - scoreB : scoreB - scoreA;
    });
    setGroupedScores(sortedScores);
  };

  return (
    <div className="Leaderboard">
      <div className="gameTitle">
        {" "}
        Leaderboard for{" "}
        <a href={game.gameURL} target="_blank" rel="noreferrer">
          {game.gameName}
        </a>
      </div>
      <table className="scoreTable">
        <thead className="tableHead">
          <tr>
            <th>Username</th>
            {scoreTypes.map((scoreType) => (
              <th
                key={scoreType}
                style={{ cursor: "pointer" }}
                onClick={() => sortHandler(scoreType)}>
                {scoreType}
              </th>
            ))}
          </tr>
        </thead>
        {
          <tbody>
            {groupedScores.map(({ username, scores }) => (
              <tr key={username}>
                <td>{username}</td>
                {scoreTypes.map((scoreType) => (
                  <td key={scoreType}>{scores[scoreType]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        }
      </table>
    </div>
  );
}
