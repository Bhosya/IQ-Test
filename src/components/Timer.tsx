
import React, { useEffect } from 'react';
import { useTest } from '@/contexts/TestContext';

const Timer = () => {
  const { testState, updateTimer, finishTest } = useTest();

  useEffect(() => {
    if (testState.timeRemaining <= 0 || testState.isCompleted) {
      return;
    }

    const timer = setInterval(() => {
      updateTimer(testState.timeRemaining - 1);
      
      if (testState.timeRemaining <= 1) {
        finishTest();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [testState.timeRemaining, testState.isCompleted, updateTimer, finishTest]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (testState.timeRemaining <= 60) return 'text-red-500';
    if (testState.timeRemaining <= 300) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Time:</span>
      <span className={`text-lg font-mono font-bold ${getTimerColor()}`}>
        {formatTime(testState.timeRemaining)}
      </span>
    </div>
  );
};

export default Timer;
