import React, { useRef, useEffect } from "react";
import PreCount from "./PreCount";
import RandomSquare from "./RandomSquare";
import "./ChessBoard.css";
import { squareInfo, squareColor } from "../../logic/board";

interface ChessBoardProps {
  setBoard: (board: any) => void;
  preCountDown: string;
  id: string | null;
  handleChoice: React.MouseEventHandler<HTMLTableCellElement>;
  visible: boolean;
  countDownStart?: boolean;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ setBoard, preCountDown, id, handleChoice, visible }) => {
  const boardRef = useRef(null);

  useEffect(() => {
    setBoard(boardRef.current);
  }, [setBoard]);

  return (
    <table className="board" ref={boardRef}>
      <tbody>
        {[...Array(8)].map((_, i) => (
          <tr key={i}>
            {[...Array(8)].map((_, j) => {
              const square = squareInfo(i,j);
              const id = square.id;
              const className = squareColor(i,j);
              const file = square.file;
              const rank = square.rank;
              const isLetterCell = i === 7 && j !== 0;
              const isNumberCell = j === 0 && i !== 7;
              return isLetterCell ? (
                <td
                  key={id}
                  id={id}
                  className={className}
                  onClick={handleChoice}
                >
                  <p className="file">{file}</p>
                </td>
              ) : isNumberCell ? (
                <td
                  key={id}
                  id={id}
                  className={className}
                  onClick={handleChoice}
                >
                  <p className="rank">{rank}</p>
                </td>
              ) : i === 7 && j === 0 ? (
                <td
                  key={id}
                  id={id}
                  className={className}
                  onClick={handleChoice}
                >
                  <p className="file">{file}</p>
                  <p className="rank">{rank}</p>
                </td>
              ) : (
                <td
                  key={id}
                  id={id}
                  className={className}
                  onClick={handleChoice}
                ></td>
              );
            })}
          </tr>
        ))}
      </tbody>
      {parseInt(preCountDown) > 0 && <PreCount time={preCountDown} />}
      <RandomSquare id={id} visible={visible} />
    </table>
  );
}

export default ChessBoard;
