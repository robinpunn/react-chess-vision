import { useState, useEffect } from "react";

type HighScoreData = {
  score: number,
  total: number
};

type GameScoreState = {
  score:number;
  highScore: HighScoreData | null;
  history: string[];
  choiceHx: string[];
};

type GameScoreActions = {
  recordChoice: (choice: string, correctId: string | null) => boolean;
  incrementScore: (points?: number) => void;
  decrementScore: (points?: number) => void;
  saveHighScore: (currentScore: number, currentTotal: number) => void;
  reset: () => void;
};

type UseGameScoreReturn = GameScoreState & GameScoreActions;

export const useGameScore = (): UseGameScoreReturn => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<HighScoreData | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [choiceHx, setChoiceHx] = useState<string[]>([]);

  const recordChoice = (choice: string, correctId: string | null): boolean => {
    setChoiceHx(prev => [...prev, choice]);
    setHistory(prev => [...prev, correctId ?? ""]);
    return choice === correctId;
  };

  const incrementScore = (points: number = 1) => {
    setScore(prev => prev + points);
  };

  const decrementScore = (points: number = 1) => {
    setScore(prev => prev - points);
  }

  const saveHighScore = (currentScore: number, currentTotal: number) => {
    if (!highScore ||
        currentScore > highScore.score ||
        (currentScore === highScore.score && currentTotal < highScore.total)) {
      const newHighScore: HighScoreData = {
        score: currentScore,
        total: currentTotal
      };
      setHighScore(newHighScore);
      localStorage.setItem("highScore", JSON.stringify(newHighScore));
    };
  };

  const reset = () => {
    setScore(0);
    setHistory([]);
    setChoiceHx([]);
  };

  useEffect(() => {
    const stored = localStorage.getItem("highScore");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as HighScoreData;
        setHighScore(parsed)
      } catch(error) {
        console.error("Failed to parse high score from local storage", error)
      }
    }
  }, []);

  return {
    score,
    highScore,
    history,
    choiceHx,
    recordChoice,
    incrementScore,
    decrementScore,
    saveHighScore,
    reset,
  };
};
