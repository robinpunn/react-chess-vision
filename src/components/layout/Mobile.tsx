import React from "react";
import { Perspective } from "../../logic/board";
import ChessBoard from "../parts/ChessBoard";
import CurrentSquare from "../parts/CurrentSquare";
import History from "../parts/History";
import Timer from "../parts/Timer";
import Score from "../parts/Score";
import Start from "../parts/Start";
import HighScore from "../parts/HighScore";
import Modal from "../modal/Modal";
import { HighScoreData } from "../../hooks/core/useGameScore";

interface MobileProps {
  perspective: Perspective;
  togglePerspective: () => void;
  
  preCountDown: number;
  preCountDownRunning: boolean;
  countDown: number;
  countDownRunning: boolean;

  id: string | null;
  visible: boolean;

  score: number;
  highScore: HighScoreData | null;
  history: string[];
  choiceHx: string[];

  showModal: boolean;
  setShowModal: (show: boolean) => void;

  handleStart: () => void;
  handleChoice: (e: React.MouseEvent<HTMLTableCellElement>) => void; 
}

const Mobile: React.FC<MobileProps> = ({
  perspective,
  togglePerspective,
  preCountDown,
  preCountDownRunning,
  id,
  handleChoice,
  history,
  choiceHx,
  countDown,
  score,
  handleStart,
  countDownRunning,
  visible,
  highScore,
  showModal,
  setShowModal,
}) => {
  return (
    <div className="mobile">
      {showModal && (
        <Modal
          score={score}
          highScore={highScore}
          handleStart={handleStart}
          setShowModal={setShowModal}
        />
      )}
      <div className="current-history">
        <History history={history} choice={choiceHx} />
        <CurrentSquare id={id} countDown={countDown} />
      </div>
      <div className="board-container">
        <ChessBoard
          perspective={perspective}
          preCountDown={preCountDown}
          preCountDownRunning={preCountDownRunning}
          id={id}
          handleChoice={handleChoice}
          visible={visible}
        />
      </div>
      <div className="other-container">
        <div className="score-container">
          <Score score={score} history={history} />
          <HighScore highScore={highScore} />
        </div>
        <div className="start-container">
          <Timer time={countDown} />
          <Start handleStart={handleStart} disabled={countDownRunning} />
        </div>
      </div>
    </div>
  );
}

export default Mobile;
