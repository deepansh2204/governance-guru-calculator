
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart, ChartPie, Shield, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Index = () => {
  const features = [
    {
      title: 'Governance Metrics',
      description: 'Evaluate board composition, ethics protocols, and other governance indicators.',
      icon: Shield,
      color: 'bg-esg-gov/10',
      textColor: 'text-esg-gov',
      path: '/governance',
      indicator: 'indicator-gov'
    },
    {
      title: 'Environmental Metrics',
      description: 'Assess your carbon footprint, resource usage, and environmental impact.',
      icon: BarChart,
      color: 'bg-esg-env/10',
      textColor: 'text-esg-env',
      path: '/environmental',
      indicator: 'indicator-env'
    },
    {
      title: 'Social Metrics',
      description: 'Measure diversity, community engagement, and employee well-being factors.',
      icon: Users,
      color: 'bg-esg-soc/10',
      textColor: 'text-esg-soc',
      path: '/social',
      indicator: 'indicator-soc'
    },
    {
      title: 'Full ESG Assessment',
      description: 'Comprehensive evaluation across all Environmental, Social, and Governance factors.',
      icon: ChartPie,
      color: 'bg-esg-combined/10',
      textColor: 'text-esg-combined',
      path: '/full-esg',
      indicator: 'indicator-combined'
    }
  ];
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-medium">
              <span className="flex space-x-1">
                <span className="h-2 w-2 rounded-full bg-esg-env"></span>
                <span className="h-2 w-2 rounded-full bg-esg-soc"></span>
                <span className="h-2 w-2 rounded-full bg-esg-gov"></span>
              </span>
              <span>ESG Metrics Calculator</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Measure and Improve Your 
              <span className="bg-gradient-to-r from-esg-gov via-esg-soc to-esg-env bg-clip-text text-transparent"> Governance </span>
              Performance
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Interactive tools to calculate, visualize, and benchmark your organization's ESG metrics against industry standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/governance">
                  Start Governance Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/full-esg">
                  Full ESG Calculator
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto relative">
            <div className="bg-gradient-to-br from-white to-slate-100 shadow-lg rounded-xl overflow-hidden border border-slate-200">
              <div className="aspect-video relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-6 p-8 w-full max-w-4xl">
                    <div className="col-span-2 md:col-span-1 glass-card rounded-xl p-6 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="indicator indicator-gov"></span>
                        <h3 className="font-medium">Governance Score</h3>
                      </div>
                      <div className="text-5xl font-bold mb-4">82<span className="text-lg font-normal text-muted-foreground">/100</span></div>
                      <div className="mt-auto flex justify-between items-end">
                        <div className="text-sm text-muted-foreground">Last updated: Today</div>
                        <Button variant="ghost" size="sm" className="text-primary">View Details</Button>
                      </div>
                    </div>
                    
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
                      <div className="glass-card rounded-xl p-4 flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="indicator indicator-env"></span>
                            <h3 className="font-medium">Environmental</h3>
                          </div>
                          <div className="text-2xl font-semibold">76<span className="text-sm font-normal text-muted-foreground">/100</span></div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      <div className="glass-card rounded-xl p-4 flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="indicator indicator-soc"></span>
                            <h3 className="font-medium">Social</h3>
                          </div>
                          <div className="text-2xl font-semibold">79<span className="text-sm font-normal text-muted-foreground">/100</span></div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      <div className="glass-card rounded-xl p-4 flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="indicator indicator-combined"></span>
                            <h3 className="font-medium">Combined ESG</h3>
                          </div>
                          <div className="text-2xl font-semibold">80<span className="text-sm font-normal text-muted-foreground">/100</span></div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ESG Assessment Tools
            </h2>
            <p className="text-lg text-muted-foreground">
              Specialized calculators to measure each dimension of your organization's ESG performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Link 
                key={index} 
                to={feature.path}
                className="card-hover bg-white rounded-xl border border-slate-200 p-6 flex flex-col h-full"
              >
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.textColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <div className="mt-auto flex items-center gap-2 text-primary font-medium">
                  <span>Start Assessment</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Measure ESG Performance?
            </h2>
            <p className="text-lg text-muted-foreground">
              Strategic advantages of tracking and improving your ESG metrics
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2a10 10 0 1 0 10 10H12V2Z"/><path d="M21.18 10A9 9 0 0 0 14 3.24V10h7.18Z"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Investor Confidence</h3>
              <p className="text-muted-foreground">
                Meet investor expectations and demonstrate commitment to sustainable practices.
              </p>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Regulatory Compliance</h3>
              <p className="text-muted-foreground">
                Stay ahead of evolving regulations and reporting requirements.
              </p>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"/><path d="M15 7h6v6"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance Improvement</h3>
              <p className="text-muted-foreground">
                Identify areas for improvement and track progress over time.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Ready to assess your organization?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Start with our Governance Calculator to evaluate leadership, ethics, and compliance metrics.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/governance">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-esg-gov to-esg-combined opacity-30 blur-lg rounded-lg"></div>
                <div className="relative bg-white rounded-lg p-6 shadow-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-esg-gov"></div>
                    <h3 className="font-semibold">Governance Score</h3>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Board Independence</span>
                        <span>85%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-esg-gov rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Ethical Standards</span>
                        <span>92%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-esg-gov rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Compliance Framework</span>
                        <span>78%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-esg-gov rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
