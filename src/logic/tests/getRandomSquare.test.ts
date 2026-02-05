import {describe, it, expect} from 'vitest';
import { getRandomSquare } from '../getRandomSquare';

describe('getRandomSquare', () => {
  it('should return a valid chess square id', () => {
    const result = getRandomSquare() 
    expect(result).toMatch(/^[a-h][1-8]$/);
  });
  it('should return a string', () => {
    const result = getRandomSquare()
    expect(typeof result).toBe('string');
  });
  it('should generate different values', () => {
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(getRandomSquare())
    };
    expect(results.size).toBeGreaterThan(1);
  });
  it('should generate valid chess coordinates', () => {
    for (let i = 0; i < 50; i++) {
      const result = getRandomSquare();
      const file = result[0];
      const rank = result[1];

      expect(file).toMatch(/[a-h]/);
      expect(rank).toMatch(/[1-8]/);
    };
  });
});
