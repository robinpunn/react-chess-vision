import { renderHook, act } from "@testing-library/react";
import { usePerspective } from "./usePerspective";
import { describe, it, expect } from "vitest";

describe('usePerspective', () => {
  it('initializes with light perspective', () => {
    const { result } = renderHook(() => usePerspective());

    expect(result.current.perspective).toBe('light');
  });
  
  it('toggles from light to dark', () => {
    const { result } = renderHook(() => usePerspective());

    act(() => {
      result.current.togglePerspective();
    })

    expect(result.current.perspective).toBe('dark');
  });
  
  it('toggles from dark to light', () => {
    const { result } = renderHook(() => usePerspective());

    act(() => {
      result.current.togglePerspective();
      result.current.togglePerspective();
    })

    expect(result.current.perspective).toBe('light');
  });
  
  it('toggles multiple times', () => {
    const { result } = renderHook(() => usePerspective());

    act(() => {
      result.current.togglePerspective(); //dark
      result.current.togglePerspective(); //light
      result.current.togglePerspective(); //dark
    })

    expect(result.current.perspective).toBe('dark');
  });
})
