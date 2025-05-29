
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTest } from '@/contexts/TestContext';
import Header from '@/components/Header';
import Timer from '@/components/Timer';
import ProgressBar from '@/components/ProgressBar';

const Test = () => {
  const navigate = useNavigate();
  const { testState, startTest, nextQuestion, previousQuestion, selectAnswer, finishTest } = useTest();
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    if (testState.questions.length === 0) {
      startTest();
    }
  }, [testState.questions.length, startTest]);

  useEffect(() => {
    if (testState.isCompleted) {
      navigate('/hasil');
    }
  }, [testState.isCompleted, navigate]);

  const handleNext = () => {
    if (testState.currentQuestionIndex < testState.questions.length - 1) {
      nextQuestion();
    }
  };

  const handlePrevious = () => {
    if (testState.currentQuestionIndex > 0) {
      previousQuestion();
    }
  };

  const handleFinish = async () => {
    setIsFinishing(true);
    try {
      await finishTest();
    } catch (error) {
      console.error('Error finishing test:', error);
      setIsFinishing(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    selectAnswer(answerIndex);
  };

  if (testState.questions.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Preparing your test...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = testState.questions[testState.currentQuestionIndex];
  const currentAnswer = testState.answers[testState.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Timer and Progress */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-4">
            <Timer />
            <div className="text-sm text-muted-foreground">
              15 minutes total
            </div>
          </div>
          <ProgressBar />
        </div>

        {/* Question Card */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">
              Question {testState.currentQuestionIndex + 1}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg leading-relaxed">{currentQuestion.question}</p>
            
            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={currentAnswer === index ? "default" : "outline"}
                  className="justify-start p-4 h-auto text-left hover:scale-[1.02] transition-all"
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className="mr-3 font-bold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </Button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={testState.currentQuestionIndex === 0}
              >
                Previous
              </Button>
              
              <div className="flex gap-3">
                {testState.currentQuestionIndex === testState.questions.length - 1 ? (
                  <Button
                    onClick={handleFinish}
                    disabled={isFinishing}
                    className="min-w-[120px]"
                  >
                    {isFinishing ? 'Processing...' : 'Finish Test'}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={testState.currentQuestionIndex === testState.questions.length - 1}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Overview */}
        <div className="max-w-4xl mx-auto mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Answer Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {testState.questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${
                      index === testState.currentQuestionIndex
                        ? 'bg-primary text-white'
                        : testState.answers[index] !== null
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Test;
