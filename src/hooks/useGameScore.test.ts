import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameScore } from './useGameScore';

describe("test useGameScore", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("test initialization", ()=> {
    it("initializes with zero score and empty arrays", () => {
      const { result } = renderHook(() => useGameScore()); 

      expect(result.current.score).toBe(0);
      expect(result.current.history).toEqual([]);
      expect(result.current.choiceHx).toEqual([]);
      expect(result.current.highScore).toBe(null);
    });

    it("loads highScore from localStorage", () => {
      localStorage.setItem("highScore", JSON.stringify({score: 10, total:15}));

      const { result } = renderHook(() => useGameScore());

      expect(result.current.highScore).toEqual({score: 10, total:15});
    });
  });
  
  describe("test recordChoice", ()=> {
    it("returns true when the choice is correct", () => { 
      const { result } = renderHook(() => useGameScore());

      let wasCorrect: boolean = false;

      act(() => {
        wasCorrect = result.current.recordChoice("e4", "e4");
      });

      expect(wasCorrect).toBe(true);
    });
    
    it("returns false when the choice is incorrect", () => { 
      const { result } = renderHook(() => useGameScore());

      let wasCorrect: boolean = false;

      act(() => {
        wasCorrect = result.current.recordChoice("e4", "d4");
      });

      expect(wasCorrect).toBe(false);
    });   
    
    it("updates choiceHx", () => { 
      const { result } = renderHook(() => useGameScore());

      act(() => {
        result.current.recordChoice("e4", "d4");
      });

      expect(result.current.choiceHx).toEqual(['e4']);
    });   

    it("updates history", () => { 
      const { result } = renderHook(() => useGameScore());

      act(() => {
        result.current.recordChoice("e4", "d4");
      });

      expect(result.current.history).toEqual(['d4']);
    });   
    
    it("updates choiceHx and history multiple times", () => { 
      const { result } = renderHook(() => useGameScore());

      act(() => {
        result.current.recordChoice("e4", "d4");
        result.current.recordChoice("c4", "c4");
        result.current.recordChoice("a1", "a1");
      });

      expect(result.current.choiceHx).toEqual(['e4', 'c4', 'a1']);
      expect(result.current.history).toEqual(['d4', 'c4', 'a1']);
    });   
 
    it("does not increment score", () => { 
      const { result } = renderHook(() => useGameScore());

      act(() => {
        result.current.recordChoice("e4", "e4");
      });

      expect(result.current.score).toBe(0);
    });   
  });

  describe("test change score", () => {
    it("properly increments score", () => { 
      const { result } = renderHook(() => useGameScore());

      act(() => {
        if (result.current.recordChoice("e4", "e4")) {
          result.current.incrementScore()
        }
      });

      expect(result.current.score).toBe(1);
    });
    
    it("properly increments score by specified amount", () => { 
      const { result } = renderHook(() => useGameScore());

      act(() => {
        if (result.current.recordChoice("e4", "e4")) {
          result.current.incrementScore(3)
        } 
      });

      expect(result.current.score).toBe(3);
    });
    
    it("properly increments score multiple times", () => { 
      const { result } = renderHook(() => useGameScore());

      act(() => {
        if (result.current.recordChoice("e4", "e4")) {
          result.current.incrementScore(3)
        };
        if (result.current.recordChoice("g6", "g6")) {
          result.current.incrementScore()
        };
        if (result.current.recordChoice("a2", "a2")) {
          result.current.incrementScore()
        };
      });

      expect(result.current.score).toBe(5);
    });
    
    it("does not increment for wrong choice", () => { 
      const { result } = renderHook(() => useGameScore());

      act(() => {
        if (result.current.recordChoice("e5", "e4")) {
          result.current.incrementScore(3)
        };
        if (result.current.recordChoice("g2", "g6")) {
          result.current.incrementScore()
        };
        if (result.current.recordChoice("a8", "a2")) {
          result.current.incrementScore()
        };
      });

      expect(result.current.score).toBe(0);
    });
   
    it("properly decrements score", () => { 
      const { result } = renderHook(() => useGameScore());

      act(() => {
       result.current.decrementScore()     
      });

      expect(result.current.score).toBe(-1);
    });
    
    it("properly decrements score by specified amount", () => { 
      const { result } = renderHook(() => useGameScore());

      act(() => { 
        result.current.decrementScore(3)  
      });

      expect(result.current.score).toBe(-3);
    });
    
    it("properly decrements score multiple times", () => { 
      const { result } = renderHook(() => useGameScore());

      act(() => {
        if (!result.current.recordChoice("e4", "d4")) {
          result.current.decrementScore(3)
        } else {
          result.current.incrementScore();
        };
        if (!result.current.recordChoice("g6", "g6")) {
          result.current.decrementScore()
        } else {
          result.current.incrementScore();
        };
        if (!result.current.recordChoice("a2", "a3")) {
          result.current.decrementScore()
        } else {
          result.current.incrementScore();
        };
      });

      expect(result.current.score).toBe(-3);
    }); 
  });
  
  describe("high score tracking", () => {
    it("saves new high score when score is higher", () => {
      localStorage.setItem('highScore', JSON.stringify({score: 5, total:10}));
      const { result } = renderHook(() => useGameScore());

      act(() => {
        for (let i = 0; i < 8; i++) {
          if (result.current.recordChoice("e6", "e6")) {
            result.current.incrementScore(); 
          }
        }
      });
      
      act(() => {
        result.current.saveHighScore(result.current.score, result.current.history.length)
      });

      expect(result.current.highScore).toEqual({score: 8, total: 8});
      expect(JSON.parse(localStorage.getItem('highScore')!)).toEqual({score: 8, total: 8});
    });
    
    it("saves when score is same but total is lower", () => {
      localStorage.setItem('highScore', JSON.stringify({score: 5, total:10}));
      const { result } = renderHook(() => useGameScore());

      act(() => { 
        if (result.current.recordChoice("e6", "e6")) result.current.incrementScore(); 
        if (result.current.recordChoice("f1", "f1")) result.current.incrementScore(); 
        if (result.current.recordChoice("c3", "e6")) result.current.incrementScore(); 
        if (result.current.recordChoice("a4", "a4")) result.current.incrementScore(); 
        if (result.current.recordChoice("b8", "b1")) result.current.incrementScore(); 
        if (result.current.recordChoice("h2", "h2")) result.current.incrementScore(); 
        if (result.current.recordChoice("f2", "f2")) result.current.incrementScore(); 
      });
      
      act(() => {
        result.current.saveHighScore(result.current.score, result.current.history.length)
      });

      expect(result.current.highScore).toEqual({score: 5, total: 7});
      expect(JSON.parse(localStorage.getItem('highScore')!)).toEqual({score: 5, total: 7});
    });

    it("does not update high score when score is lower", () => {
      localStorage.setItem('highScore', JSON.stringify({score: 5, total:10}));
      const { result } = renderHook(() => useGameScore());

      act(() => { 
        if (result.current.recordChoice("e6", "e6")) result.current.incrementScore(); 
        if (result.current.recordChoice("f1", "f1")) result.current.incrementScore(); 
        if (result.current.recordChoice("c3", "c3")) result.current.incrementScore(); 
        if (result.current.recordChoice("a4", "a4")) result.current.incrementScore();  
      });
      
      act(() => {
        result.current.saveHighScore(result.current.score, result.current.history.length)
      });

      expect(result.current.score).toBe(4);
      expect(result.current.highScore).toEqual({score: 5, total: 10});
      expect(JSON.parse(localStorage.getItem('highScore')!)).toEqual({score: 5, total: 10});
    });
    
    it("does not update high score when score is same but total is lower", () => {
      localStorage.setItem('highScore', JSON.stringify({score: 4, total: 4}));
      const { result } = renderHook(() => useGameScore());

      act(() => { 
        if (result.current.recordChoice("e6", "e6")) result.current.incrementScore(); 
        if (result.current.recordChoice("f1", "f1")) result.current.incrementScore(); 
        if (result.current.recordChoice("c3", "c3")) result.current.incrementScore(); 
        if (result.current.recordChoice("a4", "a4")) result.current.incrementScore();  
        if (result.current.recordChoice("d4", "d5")) result.current.incrementScore();  
      });
      
      act(() => {
        result.current.saveHighScore(result.current.score, result.current.history.length)
      });

      expect(result.current.score).toBe(4);
      expect(result.current.history.length).toBe(5);
      expect(result.current.highScore).toEqual({score: 4, total: 4});
      expect(JSON.parse(localStorage.getItem('highScore')!)).toEqual({score: 4, total: 4});
    });
  });
  describe("test reset", () => { 
    it("resets score and arrays", () => {
      const { result } = renderHook(() => useGameScore());

      act(() => { 
        if (result.current.recordChoice("e6", "e6")) result.current.incrementScore(); 
        if (result.current.recordChoice("f1", "f1")) result.current.incrementScore(); 
      });

      expect(result.current.score).toBe(2); 
      expect(result.current.history).toEqual(["e6", "f1"]); 
      expect(result.current.choiceHx).toEqual(["e6", "f1"]); 
      
      act(() => {
        result.current.reset();
      });

      expect(result.current.score).toBe(0);
      expect(result.current.history).toEqual([]); 
      expect(result.current.choiceHx).toEqual([]); 
    });

    it("does not reset high score", () => {
      localStorage.setItem('highScore', JSON.stringify({score: 4, total: 4}));
      const { result } = renderHook(() => useGameScore());

      act(() => { 
        if (result.current.recordChoice("e6", "e6")) result.current.incrementScore(); 
        if (result.current.recordChoice("f1", "f1")) result.current.incrementScore(); 
        if (result.current.recordChoice("c3", "c3")) result.current.incrementScore(); 
        if (result.current.recordChoice("a4", "a4")) result.current.incrementScore();  
        if (result.current.recordChoice("d4", "d5")) result.current.incrementScore();  
      });
      
      expect(result.current.score).toBe(4);
      expect(result.current.history.length).toBe(5);
      expect(result.current.highScore).toEqual({score: 4, total: 4});
      expect(JSON.parse(localStorage.getItem('highScore')!)).toEqual({score: 4, total: 4});
      
      act(() => {
        result.current.reset()
      });

      expect(result.current.score).toBe(0);
      expect(result.current.history.length).toBe(0);
      expect(result.current.highScore).toEqual({score: 4, total: 4});
      expect(JSON.parse(localStorage.getItem('highScore')!)).toEqual({score: 4, total: 4});
    });
  });
});
