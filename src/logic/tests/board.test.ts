import {describe, it, expect} from 'vitest';
import {squareInfo, squareColor} from '../board'

describe("squareInfo", () => {
  // light
  it("maps top-left corner correctly in light", () => {
    const square = squareInfo(0,0);
    expect(square.id).toBe("a8");
  });

  it("maps bottom-right corner correctly in light", () => {
    const square = squareInfo(7,7)
    expect(square.id).toBe("h1");
  });

  it("maps center squares correctly in light", () => {
    const center1 = squareInfo(3,3)
    const center2 = squareInfo(4,4)
    expect(center1.id).toBe("d5");
    expect(center2.id).toBe("e4");
  });

  // dark
  it("maps top-left corner correctly in dark", () => {
    const square = squareInfo(0,0, "dark");
    expect(square.id).toBe("h1");
  });

  it("maps bottom-right corner correctly in dark", () => {
    const square = squareInfo(7,7, "dark")
    expect(square.id).toBe("a8");
  });

  it("maps center squares correctly in dark", () => {
    const center1 = squareInfo(3,3, "dark")
    const center2 = squareInfo(4,4, "dark")
    expect(center1.id).toBe("e4");
    expect(center2.id).toBe("d5");
  });

  // id
  it("always returns a valid chess square id", () => {
    const square = squareInfo(4, 7);
    expect(square.id).toMatch(/^[a-h][1-8]$/);
  });
});

describe("squareColor", () => {
  it("returns dark for top-left corner", () => {
    expect(squareColor(0, 0)).toBe("light");
  });

  it("returns light for bottom-right corner", () => {
    expect(squareColor(7, 7)).toBe("light");
  });

  it("returns center squares colors correctly", () => {
    expect(squareColor(4, 3)).toBe("dark");
    expect(squareColor(4, 4)).toBe("light");
  }); 
})
