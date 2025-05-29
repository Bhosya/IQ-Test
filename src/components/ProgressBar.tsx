
import React from 'react';
import { useTest } from '@/contexts/TestContext';

const ProgressBar = () => {
  const { testState } = useTest();
  
  const progress = testState.questions.length > 0 
    ? ((testState.currentQuestionIndex + 1) / testState.questions.length) * 100 
    : 0;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Question {testState.currentQuestionIndex + 1} of {testState.questions.length}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
