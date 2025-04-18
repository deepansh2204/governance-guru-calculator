
import { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Results = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();

  const results = location.state?.results;

  if (!results) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Authentication Required</CardTitle>
                <CardDescription>Please enter the password to view detailed results.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                  </div>
                  <Button type="submit" className="w-full">View Results</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Detailed Assessment Results</CardTitle>
              <CardDescription>
                Completed on: {new Date(results.dateCompleted).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold mb-2">Final Score</h3>
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-muted">
                  <span className={`text-4xl font-bold ${
                    results.finalScore >= 80 ? 'text-green-600' : 
                    results.finalScore >= 60 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {results.finalScore}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Detailed Breakdown</h3>
                {results.answers.map((answer: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <h4 className="font-medium">{answer.question}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Raw Value:</p>
                        <p>{answer.rawValue}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Score (0-5):</p>
                        <p>{answer.score}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Weight:</p>
                        <p>{answer.weight}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Weighted Score:</p>
                        <p>{(answer.score * answer.weight / 5).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
