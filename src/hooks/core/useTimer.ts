import { useState, useEffect, useRef } from "react";

type CountdownOptions = {
  mode: "countdown";
  duration: number;
  intervalMs?: number;
  onComplete?: () => void;
}

type CountupOptions = {
  mode: "countup";
  intervalMs?: number;
}

type UseTimerOptions = CountdownOptions | CountupOptions;

type UseTimerReturn = {
  time: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  addTime: (ms: number) => void;
  subtractTime: (ms:number) => void;
};

export const useTimer = (options: UseTimerOptions): UseTimerReturn => {
  const { mode, intervalMs = 100 } = options;
  const duration = mode === "countdown" ? options.duration : undefined;
  const onComplete = mode === "countdown" ? options.onComplete : undefined;

  const initialTime = mode === "countdown" ? duration! : 0;

  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setTime(prev => {
        if (mode === "countup") {
          return prev + intervalMs;
        }

        if (prev <= intervalMs) {
          setIsRunning(false);
          onComplete?.();
          return 0;
        }

        return prev - intervalMs;
      });
    }, intervalMs);

    return () => {
      if (intervalRef.current != null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode, intervalMs, onComplete]);

  const start = () => setIsRunning(true);

  const stop = () => setIsRunning(false);

  const reset = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  const addTime = (ms: number) => setTime(prev => prev + ms);

  const subtractTime = (ms: number) => setTime(prev => Math.max(0, prev - ms));

  return {
    time,
    isRunning,
    start, 
    stop,
    reset, 
    addTime,
    subtractTime
  };
};
