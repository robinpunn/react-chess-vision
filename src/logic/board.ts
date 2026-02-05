export interface Square {
  file: string;
  rank: number;
  id: string;
}

export type Perspective = "light" | "dark"

export const squareInfo = (rowIndex: number, colIndex: number, perspective: Perspective = "light"): Square => {
  const file = String.fromCharCode(97 + (perspective === "light" ? colIndex : 7 - colIndex));
  const rank = perspective === "light" ? 8 - rowIndex : rowIndex + 1;
  return {
    "file": file,
    "rank": rank,
    "id":`${file}${rank}`
  };
};

export const squareColor = (rowIndex: number, colIndex: number): "light" | "dark" =>  
  (rowIndex + colIndex) % 2 === 0 ? "light" : "dark"; 
