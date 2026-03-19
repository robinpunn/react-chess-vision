import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ChessBoard from './ChessBoard';
import { Perspective } from '../../logic/board';

const baseProps = {
  perspective: "light" as Perspective,
  preCountDownRunning: false,
  setBoard: vi.fn(),
  preCountDown:  0,
  id: null,
  handleChoice: vi.fn(),
  visible: false
}

describe("ChessBoard coordinate rendering", () => {
  it("Does not render coordinates when showCoordinates is false", () => {
    render(<ChessBoard {...baseProps} showCoordinates={false} />);

    expect(screen.queryByText("a")).not.toBeInTheDocument();
    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(screen.queryByText("h")).not.toBeInTheDocument();
    expect(screen.queryByText("8")).not.toBeInTheDocument();
  });
  it("renders coordinates when showCoordinates is true", () => {
    render(<ChessBoard {...baseProps} showCoordinates={true} />);

    expect(screen.queryByText("a")).toBeInTheDocument();
    expect(screen.queryByText("1")).toBeInTheDocument();
    expect(screen.queryByText("h")).toBeInTheDocument();
    expect(screen.queryByText("8")).toBeInTheDocument();
  });
})
