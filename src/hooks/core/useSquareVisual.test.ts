import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useSquareVisual } from "./useSquareVisual";

describe("test useTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts with visible = false when square is null", () => {
    const { result } = renderHook(() => useSquareVisual(null));

    expect(result.current.visible).toBe(false);
  });
  
  it("sets visible true when square becomes non-null", () => {
    const { result, rerender } = renderHook(
      ({square}) => useSquareVisual(square), {initialProps: {square:null as string | null}});

    rerender({square: "e4"});

    expect(result.current.visible).toBe(true);
  });

  it("hides after duratoin", () => {
    const { result, rerender } = renderHook(
      ({square}) => useSquareVisual(square), 
      {initialProps: {square:null as string | null}});

    rerender({square: "e4"});

    expect(result.current.visible).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.visible).toBe(false);
  });

  it("resets timer when square changes", () => {
    const { result, rerender } = renderHook(
      ({square}) => useSquareVisual(square, 1000), 
      {initialProps: {square:"e4" as string | null}});
    
    act(() => {
      vi.advanceTimersByTime(500);
    });

    rerender({square:"d5"});

    expect(result.current.visible).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.visible).toBe(false);
  });
  
  it("respects custom duaration", () => {
    const { result} = renderHook(() => useSquareVisual("e4", 2000));
    
    expect(result.current.visible).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1999);
    });

    expect(result.current.visible).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    
    expect(result.current.visible).toBe(false);
  });
});
