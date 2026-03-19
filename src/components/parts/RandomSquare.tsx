import React from "react";
interface RandomSquareProps {
  id: string | null;
  visible: boolean;
}

function RandomSquare({ id, visible }: RandomSquareProps) {
  return (
    <tbody className={`random${visible ? "" : " fade-out"}`}>
      <tr>
        <td>{id}</td>
      </tr>
    </tbody>
  );
}

export default RandomSquare;
