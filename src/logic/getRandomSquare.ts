import { squareInfo } from "./board";

export const getRandomSquare = () => {
  const randomIndex = Math.floor(Math.random() * 64);
  const row = Math.floor(randomIndex / 8);
  const col = randomIndex % 8;
  const id = squareInfo(row,col).id;
  return id;
};
