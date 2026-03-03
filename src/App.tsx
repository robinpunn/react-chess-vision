import { useState, useEffect } from "react";
import "./App.css";
import Desktop from "./components/layout/Desktop";
import Mobile from "./components/layout/Mobile";
import { usePerspective } from "./hooks/usePerspective";
import { getRandomSquare } from "./logic/getRandomSquare";
import { useWindowSize } from "./hooks/useWindowSize";
import { useGameScore } from "./hooks/useGameScore";

function App() {
  const width = useWindowSize();
  const { perspective, togglePerspective } = usePerspective();
  const scoring = useGameScore();
  const [id, setId] = useState<string | null>(null);
  const [countDown, setCountDown] = useState("0:00");
  const [preCountDown, setPreCountDown] = useState("");
  const [countDownStart, setCountDownStart] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false); 

  /*countdown timer*/
  useEffect(() => {
    let interval: number | undefined;

    if (countDownStart) {
      if (parseInt(preCountDown, 10) > 0) {
        interval = setInterval(() => {
          setPreCountDown((preCountDown) => (parseInt(preCountDown, 10) - 1).toString());
        }, 1000);
      } else if (parseInt(countDown, 10) > 0) {
        interval = setInterval(() => {
          setCountDown((countDown) => (parseInt(countDown, 10) - 1).toString());
        }, 1000);
      } else {
        setCountDownStart(false);
        setCountDown("0:00");
      }
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [countDownStart, countDown, preCountDown]);

  useEffect(() => {
    if (countDownStart && parseInt(preCountDown, 10) === 0) {
      setId(getRandomSquare());
    }
  }, [countDownStart, preCountDown]); 

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

  /*show modal at end of game*/
  useEffect(() => {
    if (countDownStart && parseInt(countDown, 10) === 0) {
      setShowModal(true); // set showModal to true when countdown reaches zero
    }
  }, [countDown, countDownStart]);

  /*start timer function*/
  const handleStart = () => {
    setShowModal(false);
    scoring.reset();
    setCountDownStart(true);
    setPreCountDown("3");
    setCountDown("30"); 
    setId(null);
  };

  /*select square*/
  const handleChoice = (e: React.MouseEvent<HTMLTableCellElement>) => {
    let choice = e.currentTarget.id;
    if (countDownStart && parseInt(preCountDown, 10) === 0) {
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
          preCountDown={preCountDown}
          id={id}
          handleChoice={handleChoice}
          history={scoring.history}
          choiceHx={scoring.choiceHx}
          countDown={countDown}
          score={scoring.score}
          handleStart={handleStart}
          countDownStart={countDownStart}
          visible={visible}
          highScore={scoring.highScore}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ) : (
        <Mobile
          perspective={perspective}
          togglePerspective={togglePerspective}
          preCountDown={preCountDown}
          id={id}
          handleChoice={handleChoice}
          history={scoring.history}
          choiceHx={scoring.choiceHx}
          countDown={countDown}
          score={scoring.score}
          handleStart={handleStart}
          countDownStart={countDownStart}
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
