import { useState } from "react";
import type { Perspective } from "../../logic/board";

type UsePerspectiveReturn = {
  perspective: Perspective;
  togglePerspective: () => void;
};

export const usePerspective = ():UsePerspectiveReturn => {
  const [perspective, setPerspective] = useState<Perspective>("light");

  const togglePerspective = () => {
    setPerspective(prev => prev === "light" ? "dark" : "light");
  }

  return { perspective, togglePerspective }
}
