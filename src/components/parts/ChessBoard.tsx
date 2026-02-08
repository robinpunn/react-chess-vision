import PreCount from "./PreCount";
import RandomSquare from "./RandomSquare";
import "./ChessBoard.css";
import { squareInfo, squareColor, Perspective } from "../../logic/board";

interface ChessBoardProps {
  perspective: Perspective,
  preCountDown: string;
  id: string | null;
  handleChoice: React.MouseEventHandler<HTMLTableCellElement>;
  visible: boolean;
  countDownStart?: boolean;
  showCoordinates?: boolean;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ 
  perspective,
  preCountDown, 
  id, 
  handleChoice, 
  visible, 
  showCoordinates=true 
}) => {
  
  return (
    <table className="board">
      <tbody>
        {[...Array(8)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {[...Array(8)].map((_, colIndex) => {
              const square = squareInfo(rowIndex, colIndex, perspective);
              const id = square.id;
              const color = squareColor(rowIndex, colIndex);

              const bottomRow = rowIndex === 7 && colIndex !== 0;
              const leftColumn = colIndex === 0 && rowIndex !== 7;
              const bottomLeftSquare = rowIndex === 7 && colIndex === 0;
             
              const showFile = 
                showCoordinates && bottomRow;
              const showRank = 
                showCoordinates && leftColumn;
              const showBoth = 
                showCoordinates && bottomLeftSquare;

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
