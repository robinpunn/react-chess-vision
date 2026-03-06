import { useState, useEffect } from "react";
import "./App.css";
import Desktop from "./components/layout/Desktop";
import Mobile from "./components/layout/Mobile";
import { usePerspective } from "./hooks/usePerspective";
import { getRandomSquare } from "./logic/getRandomSquare";
import { useWindowSize } from "./hooks/useWindowSize";
import { useGameScore } from "./hooks/useGameScore";
import { useTimer } from "./hooks/useTimer";

function App() {
  const width = useWindowSize();
  const { perspective, togglePerspective } = usePerspective();
  const scoring = useGameScore();
  const [id, setId] = useState<string | null>(null); 
  const [visible, setVisible] = useState(false);
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

  /*random square fade out*/
  useEffect(() => {
    if (id !== null) {
      setVisible(true);
      const timerId = setTimeout(() => {
        setVisible(false);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [id]); 

  /*start timer function*/
  const handleStart = () => {
    setShowModal(false);
    scoring.reset(); 
    setId(null);

    preCountDownTimer.start();
  };

  /*select square*/
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
  
  return (
    <div className="App">
      {width >= 960 ? (
        <Desktop
          perspective={perspective}
          togglePerspective={togglePerspective}
          preCountDown={preCountDownTimer.time}
          preCountDownRunning={preCountDownTimer.isRunning}
          id={id}
          handleChoice={handleChoice}
          history={scoring.history}
          choiceHx={scoring.choiceHx}
          countDown={gameTimer.time}
          score={scoring.score}
          handleStart={handleStart}
          countDownStart={gameTimer.isRunning}
          visible={visible}
          highScore={scoring.highScore}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ) : (
        <Mobile
          perspective={perspective}
          togglePerspective={togglePerspective}
          preCountDown={preCountDownTimer.time}
          preCountDownRunning={preCountDownTimer.isRunning}
          id={id}
          handleChoice={handleChoice}
          history={scoring.history}
          choiceHx={scoring.choiceHx}
          countDown={gameTimer.time}
          score={scoring.score}
          handleStart={handleStart}
          countDownStart={gameTimer.isRunning}
          visible={visible}
          highScore={scoring.highScore}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default App;
