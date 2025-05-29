
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTest } from '@/contexts/TestContext';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';

const Result = () => {
  const navigate = useNavigate();
  const { testState, resetTest } = useTest();
  const { toast } = useToast();

  React.useEffect(() => {
    if (!testState.isCompleted || testState.score === null) {
      navigate('/');
    }
  }, [testState.isCompleted, testState.score, navigate]);

  const getInterpretation = (score: number) => {
    if (score >= 130) return { level: "Genius", description: "Very superior intelligence", color: "text-purple-600" };
    if (score >= 120) return { level: "Very High", description: "Superior intelligence", color: "text-blue-600" };
    if (score >= 110) return { level: "High", description: "High average intelligence", color: "text-green-600" };
    if (score >= 90) return { level: "Average", description: "Average intelligence", color: "text-yellow-600" };
    if (score >= 80) return { level: "Low Average", description: "Low average intelligence", color: "text-orange-600" };
    return { level: "Below Average", description: "Below average intelligence", color: "text-red-600" };
  };

  const getMockAIFeedback = (score: number) => {
    const interpretation = getInterpretation(score);
    return `Based on your performance, you demonstrate ${interpretation.description.toLowerCase()}. Your strongest areas appear to be pattern recognition and logical reasoning. Consider practicing spatial reasoning exercises to further enhance your cognitive abilities. Remember, IQ is just one measure of intelligence and can be improved through learning and practice.`;
  };

  const handleRetakeTest = () => {
    resetTest();
    navigate('/tes');
  };

  const handleShare = (platform: string) => {
    const text = `I just scored ${testState.score} on an IQ test! 🧠 Test your intelligence too:`;
    const url = window.location.origin;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(`${text} ${url}`);
        toast({
          title: "Link copied!",
          description: "Share link has been copied to your clipboard.",
        });
        break;
    }
  };

  if (!testState.isCompleted || testState.score === null) {
    return null;
  }

  const interpretation = getInterpretation(testState.score);
  const correctAnswers = testState.answers.filter((answer, index) => 
    answer === testState.questions[index]?.correctAnswer
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Score Display */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl">Your IQ Test Results</CardTitle>
              <CardDescription>Congratulations on completing the test!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="text-6xl font-bold text-primary">{testState.score}</div>
                <div className="text-lg text-muted-foreground">IQ Score (out of 160)</div>
              </div>
              
              <div className={`text-2xl font-semibold ${interpretation.color}`}>
                {interpretation.level}
              </div>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {interpretation.description}
              </p>
            </CardContent>
          </Card>

          {/* Detailed Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Questions Answered:</span>
                  <span className="font-semibold">{testState.questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Correct Answers:</span>
                  <span className="font-semibold text-green-600">{correctAnswers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Accuracy:</span>
                  <span className="font-semibold">{Math.round((correctAnswers / testState.questions.length) * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Used:</span>
                  <span className="font-semibold">
                    {Math.floor((900 - testState.timeRemaining) / 60)}:{((900 - testState.timeRemaining) % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Below 85</span>
                    <span>85-115</span>
                    <span>115-130</span>
                    <span>130+</span>
                  </div>
                  <div className="relative h-4 bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 to-purple-200 rounded">
                    <div 
                      className="absolute top-0 w-2 h-4 bg-primary rounded-sm"
                      style={{ left: `${((testState.score - 70) / 90) * 100}%` }}
                    />
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    Your score: <span className="font-semibold text-primary">{testState.score}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🤖</span> AI Analysis & Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {getMockAIFeedback(testState.score)}
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleRetakeTest} size="lg" variant="outline">
              Retake Test
            </Button>
            
            <div className="flex gap-2">
              <Button onClick={() => handleShare('whatsapp')} size="lg" variant="secondary">
                Share on WhatsApp
              </Button>
              <Button onClick={() => handleShare('twitter')} size="lg" variant="secondary">
                Share on Twitter
              </Button>
              <Button onClick={() => handleShare('copy')} size="lg" variant="secondary">
                Copy Link
              </Button>
            </div>
          </div>

          {/* Disclaimer */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Disclaimer:</strong> This IQ test is for entertainment and educational purposes only. 
                It is not a substitute for professional psychological assessment. Results may vary and should not be used for diagnostic purposes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Result;
