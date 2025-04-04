import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type Question = {
  id: string;
  text: string;
  type: 'numeric' | 'slider' | 'boolean';
  min?: number;
  max?: number;
  step?: number;
  weight: number;
  idealValue?: number;
  idealRange?: [number, number];
  description?: string;
};

export type CalculatorProps = {
  title: string;
  description: string;
  type: 'env' | 'soc' | 'gov' | 'combined';
  questions: Question[];
};

const Calculator = ({ title, description, type, questions }: CalculatorProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [score, setScore] = useState(0);
  
  const totalSteps = questions.length;
  const progress = (currentStep / totalSteps) * 100;
  
  const handleStart = () => {
    setStarted(true);
    setCurrentStep(0);
    setAnswers({});
    setCompleted(false);
  };
  
  const handleAnswer = (value: number) => {
    setAnswers({
      ...answers,
      [questions[currentStep].id]: value,
    });
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateScore();
      setCompleted(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const calculateScore = () => {
    let totalScore = 0;
    let totalWeight = 0;
    
    questions.forEach(question => {
      const answer = answers[question.id] || 0;
      const weight = question.weight;
      totalWeight += weight;
      
      let questionScore = 0;
      
      if (question.type === 'boolean') {
        // For boolean questions, if the answer is 1 (true) and the idealValue is 1, 
        // give full points, otherwise 0
        questionScore = (answer === question.idealValue) ? weight : 0;
      } else if (question.idealRange) {
        // For range-based questions
        const [min, max] = question.idealRange;
        if (answer >= min && answer <= max) {
          questionScore = weight;
        } else {
          // Calculate partial score based on how far the answer is from the ideal range
          const closestBound = answer < min ? min : max;
          const distance = Math.abs(answer - closestBound);
          const maxDistance = question.max ? question.max - question.min! : 10;
          questionScore = weight * (1 - Math.min(distance / maxDistance, 1));
        }
      } else if (question.idealValue !== undefined) {
        // For value-based questions
        const maxDifference = question.max ? question.max - question.min! : 10;
        const difference = Math.abs(answer - question.idealValue);
        questionScore = weight * (1 - Math.min(difference / maxDifference, 1));
      }
      
      totalScore += questionScore;
    });
    
    // Normalize to 0-100 scale
    const finalScore = (totalWeight > 0) ? (totalScore / totalWeight) * 100 : 0;
    setScore(Math.round(finalScore));
  };
  
  const getScoreColor = () => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getScoreDescription = () => {
    if (score >= 80) return 'Excellent! Your organization is demonstrating strong ESG practices.';
    if (score >= 60) return 'Good progress. There are opportunities to enhance your ESG performance.';
    return 'Needs improvement. Consider focusing on the areas highlighted below.';
  };
  
  const renderQuestion = () => {
    if (!started || currentStep >= questions.length) return null;
    
    const question = questions[currentStep];
    const currentAnswer = answers[question.id] || (question.min || 0);
    
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-start gap-2">
          <h3 className="text-xl font-medium flex-1">{question.text}</h3>
          {question.description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{question.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        {question.type === 'numeric' && (
          <div className="space-y-2">
            <Input 
              type="number"
              min={question.min}
              max={question.max}
              step={question.step || 1}
              value={currentAnswer}
              onChange={(e) => handleAnswer(parseFloat(e.target.value))}
              className="w-full"
            />
            {question.min !== undefined && question.max !== undefined && (
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Min: {question.min}</span>
                <span>Max: {question.max}</span>
              </div>
            )}
          </div>
        )}
        
        {question.type === 'slider' && (
          <div className="space-y-6">
            <Slider
              min={question.min || 0}
              max={question.max || 10}
              step={question.step || 1}
              value={[currentAnswer]}
              onValueChange={(values) => handleAnswer(values[0])}
            />
            <div className="flex justify-between text-sm">
              <span>{question.min || 0}</span>
              <span className="font-medium">{currentAnswer}</span>
              <span>{question.max || 10}</span>
            </div>
            {question.idealRange && (
              <div className="text-xs text-muted-foreground text-center">
                Ideal range: {question.idealRange[0]} - {question.idealRange[1]}
              </div>
            )}
          </div>
        )}
        
        {question.type === 'boolean' && (
          <div className="flex justify-center gap-4">
            <Button 
              variant={currentAnswer === 0 ? "default" : "outline"}
              onClick={() => handleAnswer(0)}
              className="w-32"
            >
              No
            </Button>
            <Button 
              variant={currentAnswer === 1 ? "default" : "outline"}
              onClick={() => handleAnswer(1)}
              className="w-32"
            >
              Yes
            </Button>
          </div>
        )}
      </div>
    );
  };
  
  const renderResults = () => {
    if (!completed) return null;
    
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2">Your {title} Score</h3>
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-muted">
            <span className={`text-4xl font-bold ${getScoreColor()}`}>{score}</span>
          </div>
          <p className="mt-4 text-muted-foreground">{getScoreDescription()}</p>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium">Score Breakdown</h4>
          {questions.map((question) => {
            const answer = answers[question.id] || 0;
            const hasIdealValue = question.idealValue !== undefined;
            const hasIdealRange = question.idealRange !== undefined;
            
            let status = 'neutral';
            if (hasIdealValue && answer === question.idealValue) {
              status = 'good';
            } else if (hasIdealRange && answer >= question.idealRange[0] && answer <= question.idealRange[1]) {
              status = 'good';
            } else if ((hasIdealValue || hasIdealRange) && answer !== 0) {
              status = 'warning';
            }
            
            return (
              <div key={question.id} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex justify-between">
                  <div className="flex-1">
                    <p className="text-sm">{question.text}</p>
                    {question.description && (
                      <p className="text-xs text-muted-foreground mt-1">{question.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-sm font-medium">{answer}</span>
                    <span 
                      className={`w-3 h-3 rounded-full ${
                        status === 'good' ? 'bg-green-500' : 
                        status === 'warning' ? 'bg-yellow-500' : 
                        'bg-slate-300'
                      }`}
                    ></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleStart}>
            Start Over
          </Button>
          <Button variant="default" onClick={() => window.print()}>
            Export Results
          </Button>
        </div>
      </div>
    );
  };
  
  const renderStartScreen = () => {
    if (started) return null;
    
    return (
      <div className="text-center space-y-6 animate-fade-in">
        <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
          type === 'env' ? 'bg-esg-env/10' : 
          type === 'soc' ? 'bg-esg-soc/10' : 
          type === 'gov' ? 'bg-esg-gov/10' : 
          'bg-esg-combined/10'
        }`}>
          <div className={`w-8 h-8 rounded-full ${
            type === 'env' ? 'bg-esg-env' : 
            type === 'soc' ? 'bg-esg-soc' : 
            type === 'gov' ? 'bg-esg-gov' : 
            'bg-esg-combined'
          }`}></div>
        </div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
        <p className="text-sm">This assessment contains {questions.length} questions and takes approximately {Math.ceil(questions.length * 0.5)} minutes to complete.</p>
        <Button 
          className={`w-full ${
            type === 'env' ? 'bg-esg-env hover:bg-esg-env/90' : 
            type === 'soc' ? 'bg-esg-soc hover:bg-esg-soc/90' : 
            type === 'gov' ? 'bg-esg-gov hover:bg-esg-gov/90' : 
            'bg-esg-combined hover:bg-esg-combined/90'
          }`} 
          onClick={handleStart}
        >
          Start Assessment
        </Button>
      </div>
    );
  };
  
  return (
    <Card className={`w-full max-w-2xl mx-auto shadow-md ${
      type === 'env' ? 'env-card' : 
      type === 'soc' ? 'soc-card' : 
      type === 'gov' ? 'gov-card' : 
      'combined-card'
    }`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="min-h-[350px]">
        {started && !completed && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Question {currentStep + 1} of {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        )}
        
        {renderStartScreen()}
        {renderQuestion()}
        {renderResults()}
      </CardContent>
      
      {started && !completed && (
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default Calculator;
