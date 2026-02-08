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

interface MobileProps {
  perspective: Perspective;
  togglePerspective: () => void;
  preCountDown: string;
  id: string | null;
  handleChoice: React.MouseEventHandler<HTMLTableCellElement>;
  history: string[];
  choiceHx: string[];
  countDown: string;
  score: number;
  handleStart: () => void;
  visible: boolean;
  countDownStart: boolean;
  highScore: string;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const Mobile: React.FC<MobileProps> = ({
  perspective,
  togglePerspective,
  preCountDown,
  id,
  handleChoice,
  history,
  choiceHx,
  countDown,
  score,
  handleStart,
  countDownStart,
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
          <Start handleStart={handleStart} disabled={countDownStart} />
        </div>
      </div>
    </div>
  );
}

export default Mobile;
