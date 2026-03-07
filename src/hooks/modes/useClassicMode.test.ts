import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useClassicMode } from "./useClassicMode";

describe("useClassicMode", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  
  describe("initialization", () => {
    it("initializes with correct default score", () => {
      const { result } = renderHook(() => useClassicMode());

      expect(result.current.preCountDown).toBe(3000);
      expect(result.current.preCountDownRunning).toBe(false);
      expect(result.current.countDown).toBe(30000);
      expect(result.current.countDownRunning).toBe(false);
      expect(result.current.id).toBe(null);
      expect(result.current.visible).toBe(false);
      expect(result.current.score).toBe(0);
      expect(result.current.showModal).toBe(false);
    });
  });

  describe("game flow", () => {
    it("completes full game flow: start, preCountDown, game, choices", () => {
      const { result } = renderHook(() => useClassicMode());

      act(() => {
        result.current.handleStart();
      });

      expect(result.current.preCountDownRunning).toBe(true);
      expect(result.current.showModal).toBe(false);

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(result.current.preCountDownRunning).toBe(false);
      expect(result.current.countDownRunning).toBe(true);
      expect(result.current.id).not.toBe(null);

      const firstSquare = result.current.id;
      const mockEvent = {
        currentTarget: { id: firstSquare }
      } as React.MouseEvent<HTMLTableCellElement>;

      act(() => {
        result.current.handleChoice(mockEvent);
      });

      expect(result.current.score).toBe(1);
      expect(result.current.id).not.toBe(firstSquare); 
      
      act(() => {
        vi.advanceTimersByTime(30000);
      });

      expect(result.current.countDownRunning).toBe(false);
      expect(result.current.showModal).toBe(true);
    });

    it("prevents starting a game while game is running", () => {
      const { result } = renderHook(() => useClassicMode());

      act(() => {
        result.current.handleStart();
      });

      const preCountAfterFirstStart = result.current.preCountDown;

      act(() => {
        result.current.handleStart();
      });

      expect(result.current.preCountDown).toBe(preCountAfterFirstStart);

      act(() => {
        vi.advanceTimersByTime(2000);
      });
      
      act(() => {
        result.current.handleStart();
      });

      expect(result.current.preCountDown).toBe(1000);
    });

    it("ignores choices during preCountDown", () => {
      const { result } = renderHook(() => useClassicMode());

      act(() => {
        result.current.handleStart();
      });

      const mockEvent = {
        currentTarget: {id: 'e4'}
      } as React.MouseEvent<HTMLTableCellElement>;

       act(() => {
        result.current.handleChoice(mockEvent);
      });

      expect(result.current.score).toBe(0);
    });
  });

  describe("scoring", () => {
    it("increments score on a correct choice", () => {
      const { result } = renderHook(() => useClassicMode());

      act(() => {
        result.current.handleStart();
      });

      act(() => {
        vi.advanceTimersByTime(3000); 
      });

      expect(result.current.preCountDown).toBe(0);
      expect(result.current.countDownRunning).toBe(true); 

      const correctSquare = result.current.id;
      const mockEvent = {
        currentTarget: { id: correctSquare }
      } as React.MouseEvent<HTMLTableCellElement>;

      act(() => {
        result.current.handleChoice(mockEvent);
      });

      expect(result.current.history.length).toBe(1);
    });
    
    it("", () => {});
  });

  describe("reset", () => {
    it("resets game state when starting a new game", () => {
      const { result } = renderHook(() => useClassicMode());
      
      act(() => {
        result.current.handleStart();
      });

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      const mockEvent = {
        currentTarget: { id: result.current.id }
      } as React.MouseEvent<HTMLTableCellElement>;

      act(() => {
        result.current.handleChoice(mockEvent);
      });

      expect(result.current.score).toBe(1);

      act(() => {
        vi.advanceTimersByTime(30000);
      });

      act(() => {
        result.current.handleStart();
      });

      expect(result.current.score).toBe(0);
      expect(result.current.id).toBe(null); 
      expect(result.current.showModal).toBe(false);
    });
  });
});
