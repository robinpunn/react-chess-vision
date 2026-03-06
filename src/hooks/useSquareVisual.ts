import { useState, useEffect } from "react";

export const useSquareVisual = (currentSquare: string | null, duration: number = 1000) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if(currentSquare !== null) {
      setVisible(true);
      const timerId = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timerId);
    }
  }, [currentSquare, duration]);

  return { visible } 
};
