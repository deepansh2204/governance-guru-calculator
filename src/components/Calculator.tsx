
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
  formula?: string;
  formulaInputs?: string[];
  inputLabels?: string[];
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
  const [formulaInputValues, setFormulaInputValues] = useState<Record<string, Record<string, number>>>({});
  const [score, setScore] = useState(0);
  
  const totalSteps = questions.length;
  const progress = (currentStep / totalSteps) * 100;
  
  const handleStart = () => {
    setStarted(true);
    setCurrentStep(0);
    setAnswers({});
    setFormulaInputValues({});
    setCompleted(false);
  };
  
  const handleAnswer = (value: number) => {
    setAnswers({
      ...answers,
      [questions[currentStep].id]: value,
    });
  };

  const handleFormulaInputChange = (questionId: string, inputKey: string, value: number) => {
    setFormulaInputValues({
      ...formulaInputValues,
      [questionId]: {
        ...(formulaInputValues[questionId] || {}),
        [inputKey]: value
      }
    });

    // Calculate the answer based on formula inputs
    const question = questions.find(q => q.id === questionId);
    if (question?.formula && question.formulaInputs) {
      const inputValues = {
        ...(formulaInputValues[questionId] || {}),
        [inputKey]: value
      };
      
      // Only calculate if all formula inputs have values
      const allInputsProvided = question.formulaInputs.every(
        input => inputValues[input] !== undefined
      );
      
      if (allInputsProvided) {
        let calculatedValue = 0;
        
        switch (questionId) {
          case 'ethical_business_conduct':
            // (Completed AI Compliance Checks / Total Scheduled Checks) × 100
            calculatedValue = (inputValues.completed / inputValues.total) * 100;
            break;
          case 'board_composition':
            // (No. of Independent & Diverse Directors / Total Board Members) × 100
            calculatedValue = (inputValues.independent / inputValues.total) * 100;
            break;
          case 'shareholder_rights':
            // Total Digital Governance Disclosures / Quarter
            calculatedValue = inputValues.disclosures;
            break;
          case 'risk_management':
            // Total AI Risk Assessments Conducted / Year
            calculatedValue = inputValues.assessments;
            break;
          case 'whistleblower_mechanism':
            // (Whistleblower Cases Resolved with Independent Review / Total Cases) × 100
            calculatedValue = (inputValues.resolved / inputValues.total) * 100;
            break;
          case 'stakeholder_engagement':
            // No. of Verified Blockchain Reports / Year
            calculatedValue = inputValues.reports;
            break;
          case 'esg_oversight':
            // (Automated Compliance Tasks / Total ESG Tasks) × 100
            calculatedValue = (inputValues.automated / inputValues.total) * 100;
            break;
          case 'data_security':
            // [(1 - (Data Breaches / Total Attempts)) × (AI Security Level / 5)] × 5
            const breachRatio = inputValues.breaches > 0 ? 
              1 - (inputValues.breaches / inputValues.attempts) : 1;
            calculatedValue = breachRatio * inputValues.securityLevel;
            break;
          default:
            break;
        }
        
        // Ensure the calculated value is within bounds
        if (question.min !== undefined && question.max !== undefined) {
          calculatedValue = Math.max(question.min, Math.min(calculatedValue, question.max));
        }
        
        // Update the answer with the calculated value
        setAnswers({
          ...answers,
          [questionId]: calculatedValue
        });
      }
    }
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
        // For range-based questions - STRICT: only award points if within range
        const [min, max] = question.idealRange;
        if (answer >= min && answer <= max) {
          // Calculate proportional score within the ideal range
          const rangeSize = max - min;
          const positionInRange = answer - min;
          const proportionInRange = rangeSize > 0 ? positionInRange / rangeSize : 1;
          questionScore = weight * (0.7 + (proportionInRange * 0.3)); // At least 70% of weight if in range
        } else {
          // No points if outside ideal range
          questionScore = 0;
        }
      } else if (question.idealValue !== undefined) {
        // For value-based questions - STRICT: only award full points for exact match
        questionScore = (answer === question.idealValue) ? weight : 0;
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
  
  const renderFormulaInputs = (question: Question) => {
    if (!question.formulaInputs || !question.inputLabels) return null;
    
    return (
      <div className="space-y-3 mt-4">
        <p className="text-sm font-medium">Enter values to calculate:</p>
        {question.formulaInputs.map((inputKey, index) => {
          const label = question.inputLabels?.[index] || inputKey;
          return (
            <div key={inputKey} className="flex items-center gap-2">
              <label className="text-sm w-full max-w-[200px]">{label}:</label>
              <Input
                type="number"
                min={0}
                value={(formulaInputValues[question.id]?.[inputKey] || 0).toString()}
                onChange={(e) => handleFormulaInputChange(
                  question.id, 
                  inputKey, 
                  parseFloat(e.target.value) || 0
                )}
                className="max-w-[150px]"
              />
            </div>
          );
        })}

        {answers[question.id] !== undefined && (
          <div className="mt-3 p-3 bg-slate-50 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Calculated Result:</span>
              <span className="text-lg font-bold">{Math.round(answers[question.id] * 100) / 100}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Formula: {question.formula}
            </p>
          </div>
        )}
      </div>
    );
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
        
        {question.formula ? (
          renderFormulaInputs(question)
        ) : (
          <>
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
          </>
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
                    {question.formula && (
                      <p className="text-xs text-muted-foreground mt-1">Formula: {question.formula}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-sm font-medium">{Math.round(answer * 100) / 100}</span>
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
          <Button 
            onClick={handleNext}
            disabled={
              questions[currentStep]?.formula &&
              questions[currentStep]?.formulaInputs &&
              !answers[questions[currentStep].id]
            }
          >
            {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default Calculator;
