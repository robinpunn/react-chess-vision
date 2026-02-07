import { useState, useEffect } from "react";
import "./App.css";
import Desktop from "./components/layout/Desktop";
import Mobile from "./components/layout/Mobile";
import { usePerspective } from "./hooks/usePerspective";
import { getRandomSquare } from "./logic/getRandomSquare";

function App() {
  const { perspective, togglePerspective } = usePerspective();
  const [board, setBoard] = useState(null);
  const [id, setId] = useState<string | null>(null);
  const [countDown, setCountDown] = useState("0:00");
  const [preCountDown, setPreCountDown] = useState("");
  const [countDownStart, setCountDownStart] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [choiceHx, setChoiceHx] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [visible, setVisible] = useState(false);
  const [highScore, setHighScore] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  /*check window size*/
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  /*high score*/
  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      setHighScore(storedHighScore);
    }
  }, []);

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
    setScore(0);
    setCountDownStart(true);
    setPreCountDown("3");
    setCountDown("30");
    setHistory([]);
    setChoiceHx([]);
    setId(null);
  };

  /*select square*/
  const handleChoice = (e: React.MouseEvent<HTMLTableCellElement>) => {
    let choice = e.currentTarget.id;
    if (countDownStart && parseInt(preCountDown, 10) === 0) {
      if (choice === id) {
        setChoiceHx([...choiceHx, choice]);
        setHistory([...history, id]);
        setScore(score + 1);
        saveHighScore(score + 1, history.length + 1);
        setId(getRandomSquare());
      } else {
        setChoiceHx([...choiceHx, choice]);
        setHistory([...history, id]);
        setId(getRandomSquare());
      }
    }
  };

  /*save high score*/
  const saveHighScore = (score: number, total:number) => {
    const highScoreString = localStorage.getItem("highScore");
    if (highScoreString) {
      const [prevScore, prevTotal] = highScoreString.split("/");
      if (score > parseInt(prevScore, 10) || (score === parseInt(prevScore, 10) && total < parseInt(prevScore, 10))) {
        const newHighScore = `${score}/${total}`;
        setHighScore(newHighScore);
        localStorage.setItem("highScore", newHighScore);
      }
    } else {
      const newHighScore = `${score}/${total}`;
      setHighScore(newHighScore);
      localStorage.setItem("highScore", newHighScore);
    }
  };

  return (
    <div className="App">
      {width >= 960 ? (
        <Desktop
          perspective={perspective}
          togglePerspective={togglePerspective}
          setBoard={setBoard}
          preCountDown={preCountDown}
          id={id}
          handleChoice={handleChoice}
          history={history}
          choiceHx={choiceHx}
          countDown={countDown}
          score={score}
          handleStart={handleStart}
          countDownStart={countDownStart}
          visible={visible}
          highScore={highScore}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ) : (
        <Mobile
          perspective={perspective}
          togglePerspective={togglePerspective}
          setBoard={setBoard}
          preCountDown={preCountDown}
          id={id}
          handleChoice={handleChoice}
          history={history}
          choiceHx={choiceHx}
          countDown={countDown}
          score={score}
          handleStart={handleStart}
          countDownStart={countDownStart}
          visible={visible}
          highScore={highScore}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default App;
