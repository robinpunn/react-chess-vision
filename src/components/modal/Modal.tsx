import React from "react";
import Start from "../parts/Start";
import "./Modal.css";
import { HighScoreData } from "../../hooks/useGameScore";

interface ModalProps {
  score: number;
  handleStart: () => void;
  highScore: HighScoreData | null;
  setShowModal: (showModal: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ score, highScore, handleStart, setShowModal }) => {
  return (
    <div className="modal-container">
      <h3 className="modal-close" onClick={() => setShowModal(false)}>
        X
      </h3>
      <h1 className="modal-title">Game Over</h1>
      <div className="modal-scores">
        <h3>Your score: {score}</h3>
        <h3>High score: {highScore ? `${highScore.score}/${highScore.total}` : null}</h3>
      </div>
      <div className="modal-button">
        <h4 className="modal-button-text">Play Again:</h4>
        <Start className="modal-start" handleStart={handleStart} />
      </div>
    </div>
  );
}

export default Modal;
