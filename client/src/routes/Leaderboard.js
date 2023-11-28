import "./Leaderboard.css";
import { useParams } from "react-router-dom";

export default function Leaderboard() {
  const { index } = useParams();

  return (
    <div className="Leaderboard">
      <div>Leaderboard {index}</div>
    </div>
  );
}
