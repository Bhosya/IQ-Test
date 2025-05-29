
import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TestState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: (number | null)[];
  timeRemaining: number;
  isCompleted: boolean;
  score: number | null;
}

interface TestContextType {
  testState: TestState;
  startTest: () => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  selectAnswer: (answerIndex: number) => void;
  finishTest: () => Promise<void>;
  resetTest: () => void;
  updateTimer: (seconds: number) => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What comes next in the sequence: 2, 4, 8, 16, ?",
    options: ["24", "32", "30", "20"],
    correctAnswer: 1,
    difficulty: "easy"
  },
  {
    id: 2,
    question: "If all Bloops are Razzles and all Razzles are Lazzles, then all Bloops are definitely Lazzles.",
    options: ["True", "False", "Cannot be determined", "Sometimes true"],
    correctAnswer: 0,
    difficulty: "medium"
  },
  {
    id: 3,
    question: "Which number doesn't belong: 3, 5, 11, 14, 17, 21",
    options: ["3", "14", "17", "21"],
    correctAnswer: 1,
    difficulty: "medium"
  },
  {
    id: 4,
    question: "What is the missing number: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "13", "15", "16"],
    correctAnswer: 1,
    difficulty: "easy"
  },
  {
    id: 5,
    question: "A car travels 60km in 1 hour. How far will it travel in 45 minutes at the same speed?",
    options: ["45km", "40km", "50km", "55km"],
    correctAnswer: 0,
    difficulty: "medium"
  },
  {
    id: 6,
    question: "Which word is the odd one out: Dog, Cat, Horse, Fish, Bird",
    options: ["Dog", "Cat", "Fish", "Bird"],
    correctAnswer: 2,
    difficulty: "easy"
  },
  {
    id: 7,
    question: "If 5 machines can make 5 widgets in 5 minutes, how long would it take 100 machines to make 100 widgets?",
    options: ["100 minutes", "20 minutes", "5 minutes", "1 minute"],
    correctAnswer: 2,
    difficulty: "hard"
  },
  {
    id: 8,
    question: "What comes next: O, T, T, F, F, S, S, ?",
    options: ["E", "N", "T", "A"],
    correctAnswer: 0,
    difficulty: "hard"
  },
  {
    id: 9,
    question: "A rectangle has a perimeter of 20cm and width of 3cm. What is its area?",
    options: ["21 cm²", "30 cm²", "42 cm²", "60 cm²"],
    correctAnswer: 0,
    difficulty: "medium"
  },
  {
    id: 10,
    question: "Which pattern completes the series: △, ○, △, ○, △, ?",
    options: ["△", "○", "□", "◇"],
    correctAnswer: 1,
    difficulty: "easy"
  }
];

export const TestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [testState, setTestState] = useState<TestState>({
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    timeRemaining: 900, // 15 minutes in seconds
    isCompleted: false,
    score: null
  });

  const startTest = useCallback(() => {
    const shuffledQuestions = [...sampleQuestions].sort(() => Math.random() - 0.5);
    setTestState({
      questions: shuffledQuestions,
      currentQuestionIndex: 0,
      answers: new Array(shuffledQuestions.length).fill(null),
      timeRemaining: 900,
      isCompleted: false,
      score: null
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setTestState(prev => ({
      ...prev,
      currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, prev.questions.length - 1)
    }));
  }, []);

  const previousQuestion = useCallback(() => {
    setTestState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0)
    }));
  }, []);

  const selectAnswer = useCallback((answerIndex: number) => {
    setTestState(prev => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestionIndex] = answerIndex;
      return {
        ...prev,
        answers: newAnswers
      };
    });
  }, []);

  const finishTest = useCallback(async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setTestState(prev => {
          let correctAnswers = 0;
          prev.questions.forEach((question, index) => {
            if (prev.answers[index] === question.correctAnswer) {
              correctAnswers++;
            }
          });

          const percentage = (correctAnswers / prev.questions.length) * 100;
          let iqScore = Math.round(85 + (percentage / 100) * 75); // Scale to 85-160 range
          iqScore = Math.max(85, Math.min(160, iqScore));

          return {
            ...prev,
            isCompleted: true,
            score: iqScore
          };
        });
        resolve();
      }, 2000); // Simulate AI processing time
    });
  }, []);

  const resetTest = useCallback(() => {
    setTestState({
      questions: [],
      currentQuestionIndex: 0,
      answers: [],
      timeRemaining: 900,
      isCompleted: false,
      score: null
    });
  }, []);

  const updateTimer = useCallback((seconds: number) => {
    setTestState(prev => ({
      ...prev,
      timeRemaining: seconds
    }));
  }, []);

  return (
    <TestContext.Provider value={{
      testState,
      startTest,
      nextQuestion,
      previousQuestion,
      selectAnswer,
      finishTest,
      resetTest,
      updateTimer
    }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
};
