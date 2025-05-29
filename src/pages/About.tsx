
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">About Our IQ Test</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn about our comprehensive intelligence assessment and how it works
            </p>
          </div>

          {/* What is IQ */}
          <Card>
            <CardHeader>
              <CardTitle>What is an IQ Test?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                An Intelligence Quotient (IQ) test is a standardized assessment designed to measure human intelligence 
                and cognitive abilities. It evaluates various mental skills including logical reasoning, pattern recognition, 
                mathematical skills, and spatial intelligence.
              </p>
              <p>
                IQ scores are typically scaled with an average of 100, where about 68% of the population scores between 
                85 and 115, and 95% score between 70 and 130.
              </p>
            </CardContent>
          </Card>

          {/* Our Test */}
          <Card>
            <CardHeader>
              <CardTitle>Our IQ Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Our test consists of 10 carefully crafted questions that assess different aspects of intelligence:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Logical Reasoning:</strong> Questions that test your ability to think logically and draw conclusions</li>
                <li><strong>Pattern Recognition:</strong> Identifying patterns and sequences in numbers, shapes, or symbols</li>
                <li><strong>Mathematical Problem Solving:</strong> Word problems and numerical reasoning challenges</li>
                <li><strong>Spatial Intelligence:</strong> Understanding relationships between objects and shapes</li>
                <li><strong>Verbal Reasoning:</strong> Language-based logical problems and categorization tasks</li>
              </ul>
            </CardContent>
          </Card>

          {/* AI Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🤖</span> How AI Enhances Our Test
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Our platform leverages artificial intelligence to provide you with detailed insights:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Adaptive Scoring:</strong> AI algorithms analyze your response patterns for more accurate scoring</li>
                <li><strong>Personalized Feedback:</strong> Get tailored recommendations based on your performance profile</li>
                <li><strong>Performance Analysis:</strong> Detailed breakdown of your strengths and areas for improvement</li>
                <li><strong>Progress Tracking:</strong> Monitor your cognitive development over multiple test sessions</li>
              </ul>
            </CardContent>
          </Card>

          {/* Test Features */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span>15-minute time limit</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span>10 diverse questions</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span>Randomized question order</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span>Progress tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span>Instant results</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scoring System</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>130+ (Genius)</span>
                    <span className="text-purple-600">2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>120-129 (Very High)</span>
                    <span className="text-blue-600">7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>110-119 (High)</span>
                    <span className="text-green-600">16%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>90-109 (Average)</span>
                    <span className="text-yellow-600">50%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>80-89 (Low Average)</span>
                    <span className="text-orange-600">16%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>70-79 (Below Average)</span>
                    <span className="text-red-600">7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Important Disclaimer */}
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="text-yellow-800 dark:text-yellow-200">Important Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="text-yellow-700 dark:text-yellow-300 space-y-3">
              <p>
                <strong>This test is for educational and entertainment purposes only.</strong> While our assessment 
                is based on established IQ testing principles, it should not be considered a substitute for 
                professional psychological evaluation.
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Results may vary based on factors like stress, fatigue, or distractions</li>
                <li>Intelligence is multifaceted and cannot be fully captured by a single test</li>
                <li>This test should not be used for medical, educational, or employment decisions</li>
                <li>For official IQ assessment, consult a licensed psychologist</li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Ready to Test Your Intelligence?</h2>
            <p className="text-muted-foreground">
              Take our comprehensive IQ test and discover your cognitive strengths
            </p>
            <Link to="/tes">
              <Button size="lg" className="transition-all duration-200 hover:scale-105">
                Start Your IQ Test
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
