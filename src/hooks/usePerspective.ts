import { useState } from "react";
import type { Perspective } from "../logic/board";

export const usePerspective = () => {
  const [perspective, setPerspective] = useState<Perspective>("dark");

  const togglePerspective = () => {
    setPerspective(prev => prev === "light" ? "dark" : "light");
  }

  return { perspective, togglePerspective }
}
