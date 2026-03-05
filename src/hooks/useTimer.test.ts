import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useTimer } from "./useTimer";

describe("test useTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("countdown timer", () => {
    it("counts down over time", () => {
      const { result } = renderHook(() => 
        useTimer({mode: "countdown", duration: 10000, intervalMs: 100})
      );

      act(() => {
        result.current.start();
      });

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current.time).toBe(9500);
    });
  });

  describe("countup timer", () => { 
    it("counts up over time", () => {
      const { result } = renderHook(() => 
        useTimer({mode: "countup", intervalMs: 100})
      );

      act(() => {
        result.current.start();
      });

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(result.current.time).toBe(300);
    });
  });

  describe("selection timer with game timer", () => {
    it("tracks elapsed time for a choice selection with countdown timer", () => {
      const { result: gameTimer } = renderHook(() => 
        useTimer({mode: "countdown", duration: 30000, intervalMs: 100})
      );
      
      const { result: choiceTimer } = renderHook(() => 
        useTimer({mode: "countup", intervalMs: 100})
      );

      act(() => {
        gameTimer.current.start();
        choiceTimer.current.start();
      });

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(gameTimer.current.time).toBe(28000);
      expect(choiceTimer.current.time).toBe(2000);

      act(() => {
        choiceTimer.current.reset();
        choiceTimer.current.start();
      });

      expect(gameTimer.current.time).toBe(28000);
      expect(choiceTimer.current.time).toBe(0);
      
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      
      expect(gameTimer.current.time).toBe(26000);
      expect(choiceTimer.current.time).toBe(2000);
    });
    
    it("tracks elapsed time for a choice selection with countup timer", () => {
      const { result: gameTimer } = renderHook(() => 
        useTimer({mode: "countup", intervalMs: 100})
      );
      
      const { result: choiceTimer } = renderHook(() => 
        useTimer({mode: "countup", intervalMs: 100})
      );

      act(() => {
        gameTimer.current.start();
        choiceTimer.current.start();
      });

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(gameTimer.current.time).toBe(2000);
      expect(choiceTimer.current.time).toBe(2000);

      act(() => {
        choiceTimer.current.reset();
        choiceTimer.current.start();
      });

      expect(gameTimer.current.time).toBe(2000);
      expect(choiceTimer.current.time).toBe(0);
      
      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(gameTimer.current.time).toBe(4000);
      expect(choiceTimer.current.time).toBe(2000);
    });
  });
});
