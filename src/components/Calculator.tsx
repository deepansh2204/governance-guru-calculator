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
  scoringScale?: number[]; // Changed from tuple to array to allow flexibility
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
  const [scoreDetails, setScoreDetails] = useState<Record<string, { rawValue: number, score: number }>>({});
  
  const totalSteps = questions.length;
  const progress = (currentStep / totalSteps) * 100;
  
  const handleStart = () => {
    setStarted(true);
    setCurrentStep(0);
    setAnswers({});
    setFormulaInputValues({});
    setCompleted(false);
    setScoreDetails({});
  };
  
  const handleAnswer = (value: number) => {
    setAnswers({
      ...answers,
      [questions[currentStep].id]: value,
    });
  };

  // Map a raw value to a 0-5 score based on the question's scoring scale
  const mapValueToScore = (questionId: string, rawValue: number): number => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return 0;
    
    // Default scoring based on the question type and ranges
    switch (questionId) {
      case 'ethical_business_conduct': // % completion of AI compliance checks
        // 0: Not implemented, 5: Fully integrated & real-time
        if (rawValue <= 0) return 0;
        if (rawValue < 20) return 1;
        if (rawValue < 40) return 2;
        if (rawValue < 60) return 3;
        if (rawValue < 80) return 4;
        return 5; // >= 80%
        
      case 'board_composition': // % of Independent & diverse members
        // 0: <20%, 5: >60% diverse and independent
        if (rawValue < 20) return 0;
        if (rawValue < 30) return 1;
        if (rawValue < 40) return 2;
        if (rawValue < 50) return 3;
        if (rawValue <= 60) return 4;
        return 5; // > 60%
        
      case 'shareholder_rights': // No. of digital disclosures/quarter
        // 0: <1, 5: >4 per quarter, real-time enabled
        if (rawValue < 1) return 0;
        if (rawValue === 1) return 1;
        if (rawValue === 2) return 2;
        if (rawValue === 3) return 3;
        if (rawValue === 4) return 4;
        return 5; // > 4
        
      case 'risk_management': // Frequency of AI risk assessments/year
        // 0: None, 5: Monthly automated reviews (which would be 12/year)
        if (rawValue <= 0) return 0;
        if (rawValue <= 2) return 1; // Quarterly
        if (rawValue <= 4) return 2; // Bi-monthly
        if (rawValue <= 6) return 3; // Every other month
        if (rawValue < 12) return 4; // Almost monthly
        return 5; // Monthly (12) or more
        
      case 'whistleblower_mechanism': // % of cases resolved transparently
        // 0: None, 5: >10/year with third-party validation
        // Note: This doesn't match your percentage formula, adjusting to use % resolved
        if (rawValue <= 0) return 0;
        if (rawValue < 20) return 1;
        if (rawValue < 40) return 2;
        if (rawValue < 60) return 3;
        if (rawValue < 80) return 4;
        return 5; // >= 80%
        
      case 'stakeholder_engagement': // Engagements verified via blockchain/year
        // 0: None, 5: Continuous disclosure system
        if (rawValue <= 0) return 0;
        if (rawValue <= 3) return 1;
        if (rawValue <= 6) return 2;
        if (rawValue <= 10) return 3;
        if (rawValue <= 15) return 4;
        return 5; // > 15 per year = continuous
        
      case 'esg_oversight': // % automation in ESG compliance
        // 0: Manual, 5: Fully automated monitoring
        if (rawValue <= 0) return 0;
        if (rawValue < 20) return 1;
        if (rawValue < 40) return 2;
        if (rawValue < 60) return 3;
        if (rawValue < 80) return 4;
        return 5; // >= 80%
        
      case 'data_security': // Combined measure of breaches and security level
        // 0: Frequent breaches, 5: Zero with AI-level 5
        // This is already normalized to 0-5 by the formula
        return Math.min(5, Math.max(0, rawValue));
        
      default:
        // If no specific mapping is defined, normalize to 0-5 scale
        if (question.min !== undefined && question.max !== undefined) {
          const range = question.max - question.min;
          if (range <= 0) return 0;
          const normalizedValue = (rawValue - question.min) / range;
          return Math.min(5, Math.max(0, normalizedValue * 5));
        }
        return 0;
    }
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
            const breachRatio = inputValues.breaches > 0 && inputValues.attempts > 0 ? 
              1 - (inputValues.breaches / inputValues.attempts) : 1;
            calculatedValue = breachRatio * (inputValues.securityLevel / 5) * 5;
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

        // Store score details for this question
        const mappedScore = mapValueToScore(questionId, calculatedValue);
        setScoreDetails({
          ...scoreDetails,
          [questionId]: { 
            rawValue: calculatedValue,
            score: mappedScore
          }
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
    
    // First calculate the 0-5 score for each question
    const newScoreDetails: Record<string, { rawValue: number, score: number }> = {};
    
    questions.forEach(question => {
      const rawValue = answers[question.id] || 0;
      const mappedScore = mapValueToScore(question.id, rawValue);
      
      newScoreDetails[question.id] = {
        rawValue,
        score: mappedScore
      };
      
      // Apply weight to the 0-5 score (not the raw value)
      const weight = question.weight;
      totalWeight += weight;
      totalScore += mappedScore * weight;
    });
    
    setScoreDetails(newScoreDetails);
    
    // Calculate final score (0-100 scale)
    // Maximum possible score is 5 * totalWeight (since each score is 0-5)
    const maxPossibleScore = 5 * totalWeight;
    const normalizedScore = (maxPossibleScore > 0) ? (totalScore / maxPossibleScore) * 100 : 0;
    
    setScore(Math.round(normalizedScore));
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

  const getScoreText = (score: number): string => {
    if (score >= 4.5) return 'Excellent (5)';
    if (score >= 3.5) return 'Very Good (4)';
    if (score >= 2.5) return 'Good (3)';
    if (score >= 1.5) return 'Fair (2)';
    if (score >= 0.5) return 'Poor (1)';
    return 'Not Implemented (0)';
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
      </div>
    );
  };

  const exportResults = () => {
    const resultsData = {
      title,
      dateCompleted: new Date().toISOString(),
      answers: Object.entries(answers).map(([questionId, rawValue]) => {
        const question = questions.find(q => q.id === questionId);
        const mappedScore = scoreDetails[questionId]?.score || 0;
        return {
          question: question?.text,
          rawValue,
          score: mappedScore,
          weight: question?.weight
        };
      }),
      finalScore: score
    };

    // Simple encryption using base64 (for demo purposes - in real world use proper encryption)
    const password = "1234";
    const encryptedData = btoa(password + JSON.stringify(resultsData));
    
    // Create and download file
    const blob = new Blob([encryptedData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-results.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleStart}>
            Start Over
          </Button>
          <Button variant="default" onClick={exportResults}>
            Export Detailed Results
          </Button>
        </div>
      </div>
    );
  };
  
  // Remove score display from formula inputs and question rendering
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
