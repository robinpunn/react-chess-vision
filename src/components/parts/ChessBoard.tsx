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
  showCoordinates?: boolean;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ 
  setBoard, 
  preCountDown, 
  id, 
  handleChoice, 
  visible, 
  showCoordinates=true 
}) => {
  const boardRef = useRef(null);

  useEffect(() => {
    setBoard(boardRef.current);
  }, [setBoard]);

  return (
    <table className="board" ref={boardRef}>
      <tbody>
        {[...Array(8)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {[...Array(8)].map((_, colIndex) => {
              const square = squareInfo(rowIndex, colIndex);
              const id = square.id;
              const color = squareColor(rowIndex, colIndex);
             
              const showFile = 
                showCoordinates && rowIndex === 7 && colIndex !== 0;
              const showRank = 
                showCoordinates && colIndex === 0 && rowIndex !== 7;
              const showBoth = 
                showCoordinates && rowIndex === 7 && colIndex === 0;
              return (
                <td
                  key={id}
                  id={id}
                  className={color}
                  onClick={handleChoice}
                >
                  {(showFile || showBoth)&&(
                    <p className="file">{square.file}</p>
                  )}
                  {(showRank || showBoth)&&(
                    <p className="rank">{square.rank}</p>
                  )}
                </td> 
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
