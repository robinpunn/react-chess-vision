export interface Square {
  file: string;
  rank: number;
  id: string;
}

export const squareInfo = (rowIndex: number, colIndex: number): Square => {
  const file = String.fromCharCode(97 + colIndex);
  const rank = 8 - rowIndex;
  return {
    "file": file,
    "rank": rank,
    "id":`${file}${rank}`
  };
};

export const squareColor = (rowIndex: number, colIndex: number): "light" | "dark" => 
  (rowIndex + colIndex) % 2 === 0 ? "light" : "dark"; 
