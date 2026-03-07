import { useState } from "react";
import { useTimer } from "../core/useTimer";
import { HighScoreData, useGameScore } from "../core/useGameScore";
import { useSquareVisual } from "../core/useSquareVisual";
import { getRandomSquare } from "../../logic/getRandomSquare";

type UseClassicModeReturn = {
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

export const useClassicMode = (): UseClassicModeReturn => {
  const scoring = useGameScore();
  const [id, setId] = useState<string | null>(null);
  const square = useSquareVisual(id);
  const [showModal, setShowModal] = useState(false);

  const gameTimer = useTimer({
    mode: "countdown",
    duration: 30000,
    intervalMs: 10,
    onComplete: () => {
      setShowModal(true);
    }
  });

  const preCountDownTimer = useTimer({
    mode: "countdown",
    duration: 3000,
    intervalMs: 1000,
    onComplete: () => {
      gameTimer.start();
      setId(getRandomSquare());
    }
  }); 

  const handleStart = () => {
    if (preCountDownTimer.isRunning || gameTimer.isRunning) {
      return;
    }

    setShowModal(false);
    scoring.reset(); 
    setId(null);
    
    gameTimer.reset();
    preCountDownTimer.reset()

    preCountDownTimer.start();
  };

  const handleChoice = (e: React.MouseEvent<HTMLTableCellElement>) => {
    let choice = e.currentTarget.id;

    if (gameTimer.isRunning && preCountDownTimer.time === 0) {
      const isCorrect = scoring.recordChoice(choice, id);
      
      if (isCorrect) {
        scoring.incrementScore();
        scoring.saveHighScore(scoring.score + 1, scoring.history.length + 1);
        setId(getRandomSquare());
      } else {
        setId(getRandomSquare());
      }
    }
  };

  return {
    preCountDown: preCountDownTimer.time,
    preCountDownRunning: preCountDownTimer.isRunning,
    countDown: gameTimer.time,
    countDownRunning: gameTimer.isRunning,

    id,
    visible: square.visible,

    score: scoring.score,
    highScore: scoring.highScore,
    history: scoring.history,
    choiceHx: scoring.choiceHx,

    showModal,
    setShowModal,

    handleStart,
    handleChoice,
  };
};
