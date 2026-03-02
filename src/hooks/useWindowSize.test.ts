import { renderHook, act } from "@testing-library/react";
import { useWindowSize } from "./useWindowSize";
import { describe, it, expect } from "vitest";

describe("useWindowSize", () => {
  it("returns initial window width", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true, 
      configurable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useWindowSize());
    console.log(result)

    expect(result.current).toBe(1024);
  });
  
  it("updates when window is resized", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true, 
      configurable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useWindowSize());
    
    act(() => {
      window.innerWidth = 500;
      window.dispatchEvent(new Event("resize"));
    });
    
    expect(result.current).toBe(500);
  }); 
});
