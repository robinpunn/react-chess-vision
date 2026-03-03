import React from "react";
import { BsTrophyFill } from "react-icons/bs";
import { HighScoreData } from "../../hooks/useGameScore";

interface HighScore {
  highScore: HighScoreData | null;
}

const HighScore: React.FC<HighScore> = ({ highScore }) => {
  return (
    <p className="high-score">
      <BsTrophyFill size="1rem" color="white" />
      {""} 
      {highScore ? `${highScore.score}/${highScore.total}` : null}
    </p>
  );
}

export default HighScore;
