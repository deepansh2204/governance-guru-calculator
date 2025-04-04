
import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart, ChartPie, Shield, Users, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Calculator from '@/components/Calculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FullESG = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  // Subset of questions from each category for the comprehensive assessment
  const combinedQuestions = [
    // Governance questions
    {
      id: 'board_independence',
      text: 'What percentage of your board members are independent directors?',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 6,
      idealValue: 75,
      idealRange: [60, 100] as [number, number] // Fix type to tuple
    },
    {
      id: 'ethics_policy',
      text: 'Does your organization have a documented code of ethics or conduct?',
      type: 'boolean' as const,
      weight: 6,
      idealValue: 1
    },
    {
      id: 'risk_management',
      text: 'Does your organization have a formal risk management framework?',
      type: 'boolean' as const,
      weight: 5,
      idealValue: 1
    },
    
    // Environmental questions
    {
      id: 'carbon_emissions',
      text: 'What are your organization\'s annual carbon emissions in metric tons of CO2 equivalent per million dollars of revenue?',
      type: 'numeric' as const,
      min: 0,
      max: 1000,
      step: 1,
      weight: 6,
      idealValue: 0,
      idealRange: [0, 100] as [number, number] // Fix type to tuple
    },
    {
      id: 'renewable_energy',
      text: 'What percentage of your energy consumption comes from renewable sources?',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 5,
      idealValue: 100,
      idealRange: [50, 100] as [number, number] // Fix type to tuple
    },
    {
      id: 'environmental_policy',
      text: 'Does your organization have a formal environmental policy?',
      type: 'boolean' as const,
      weight: 5,
      idealValue: 1
    },
    
    // Social questions
    {
      id: 'workforce_diversity',
      text: 'What percentage of your workforce represents gender diversity?',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 5,
      idealValue: 50,
      idealRange: [40, 60] as [number, number] // Fix type to tuple
    },
    {
      id: 'health_safety',
      text: 'How many workplace safety incidents occurred in the past year per 100 employees?',
      type: 'numeric' as const,
      min: 0,
      max: 20,
      step: 0.1,
      weight: 6,
      idealValue: 0,
      idealRange: [0, 1] as [number, number] // Fix type to tuple
    },
    {
      id: 'human_rights_policy',
      text: 'Does your organization have a formal human rights policy?',
      type: 'boolean' as const,
      weight: 6,
      idealValue: 1
    },
    
    // Additional ESG integration questions
    {
      id: 'esg_reporting',
      text: 'Does your organization publish an annual ESG or sustainability report?',
      type: 'boolean' as const,
      weight: 6,
      idealValue: 1
    },
    {
      id: 'esg_targets',
      text: 'Has your organization set specific, measurable ESG targets?',
      type: 'boolean' as const,
      weight: 7,
      idealValue: 1
    },
    {
      id: 'stakeholder_engagement',
      text: 'On a scale of 1-10, how would you rate your organization\'s stakeholder engagement on ESG issues?',
      type: 'slider' as const,
      min: 1,
      max: 10,
      step: 1,
      weight: 5,
      idealValue: 10,
      idealRange: [7, 10] as [number, number] // Fix type to tuple
    }
  ];
  
  const calculatorSections = [
    {
      id: 'governance',
      title: 'Governance Assessment',
      description: 'Evaluate leadership structure, ethics, and compliance',
      icon: Shield,
      color: 'bg-esg-gov/10',
      textColor: 'text-esg-gov',
      borderColor: 'border-esg-gov',
      path: '/governance',
      indicator: 'indicator-gov'
    },
    {
      id: 'environmental',
      title: 'Environmental Assessment',
      description: 'Measure environmental impact and sustainability',
      icon: BarChart,
      color: 'bg-esg-env/10',
      textColor: 'text-esg-env',
      borderColor: 'border-esg-env',
      path: '/environmental',
      indicator: 'indicator-env'
    },
    {
      id: 'social',
      title: 'Social Assessment',
      description: 'Evaluate diversity, community, and employee well-being',
      icon: Users,
      color: 'bg-esg-soc/10',
      textColor: 'text-esg-soc',
      borderColor: 'border-esg-soc',
      path: '/social',
      indicator: 'indicator-soc'
    },
    {
      id: 'combined',
      title: 'Comprehensive ESG Assessment',
      description: 'Full evaluation across all ESG dimensions',
      icon: ChartPie,
      color: 'bg-esg-combined/10',
      textColor: 'text-esg-combined',
      borderColor: 'border-esg-combined',
      path: '/full-esg',
      indicator: 'indicator-combined'
    }
  ];

  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-esg-combined/10 text-esg-combined text-sm font-medium">
              <span className="indicator indicator-combined"></span>
              <span>Full ESG Assessment</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive ESG Performance Assessment
            </h1>
            <p className="text-lg text-muted-foreground">
              Evaluate your organization across all environmental, social, and governance dimensions.
            </p>
          </div>
          
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
              <TabsTrigger value="environmental">Environmental</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="animate-fade-in">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {calculatorSections.slice(0, 3).map((section) => (
                    <Link 
                      key={section.id} 
                      to={section.path}
                      className={`card-hover bg-white rounded-xl border ${section.borderColor} p-6 flex flex-col h-full`}
                    >
                      <div className={`w-12 h-12 rounded-lg ${section.color} flex items-center justify-center mb-4`}>
                        <section.icon className={`h-6 w-6 ${section.textColor}`} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                      <p className="text-muted-foreground mb-4">{section.description}</p>
                      <div className="mt-auto flex items-center gap-2 text-primary font-medium">
                        <span>Go to Assessment</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="bg-white rounded-xl border border-esg-combined p-8">
                  <div className="max-w-3xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                      <div className="md:w-1/3">
                        <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center ${calculatorSections[3].color}`}>
                          {React.createElement(calculatorSections[3].icon, { 
                            className: `h-12 w-12 ${calculatorSections[3].textColor}` 
                          })}
                        </div>
                      </div>
                      <div className="md:w-2/3 text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-3">{calculatorSections[3].title}</h3>
                        <p className="text-muted-foreground mb-6">
                          Take a comprehensive assessment that evaluates all aspects of your organization's ESG performance including governance, environmental impact, and social responsibility.
                        </p>
                        <Button 
                          onClick={() => setSelectedTab('governance')}
                          className="bg-esg-combined hover:bg-esg-combined/90"
                        >
                          Start Comprehensive Assessment
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-8">
                  <div className="max-w-3xl mx-auto">
                    <h3 className="text-xl font-semibold mb-4 text-center">Why a Comprehensive ESG Assessment?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-4">
                        <div className="h-10 w-10 rounded-full bg-esg-gov/20 flex items-center justify-center mb-3">
                          <Shield className="h-5 w-5 text-esg-gov" />
                        </div>
                        <h4 className="font-medium mb-2">Integrated Approach</h4>
                        <p className="text-sm text-muted-foreground">
                          ESG factors are interconnected and should be evaluated holistically for the most accurate picture.
                        </p>
                      </div>
                      <div className="p-4">
                        <div className="h-10 w-10 rounded-full bg-esg-env/20 flex items-center justify-center mb-3">
                          <BarChart className="h-5 w-5 text-esg-env" />
                        </div>
                        <h4 className="font-medium mb-2">Balanced Perspective</h4>
                        <p className="text-sm text-muted-foreground">
                          See how performance in one area might impact or offset performance in others.
                        </p>
                      </div>
                      <div className="p-4">
                        <div className="h-10 w-10 rounded-full bg-esg-soc/20 flex items-center justify-center mb-3">
                          <Users className="h-5 w-5 text-esg-soc" />
                        </div>
                        <h4 className="font-medium mb-2">Stakeholder Value</h4>
                        <p className="text-sm text-muted-foreground">
                          Provide a complete view for investors, customers, and other stakeholders who value transparency.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="governance" className="animate-fade-in">
              <Calculator 
                title="Governance Assessment"
                description="Part 1 of 3: Evaluate your organization's governance practices."
                type="gov"
                questions={combinedQuestions.filter(q => 
                  ['board_independence', 'ethics_policy', 'risk_management'].includes(q.id)
                )}
              />
              <div className="flex justify-end mt-6">
                <Button 
                  onClick={() => setSelectedTab('environmental')}
                  className="bg-esg-env hover:bg-esg-env/90"
                >
                  Continue to Environmental Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="environmental" className="animate-fade-in">
              <Calculator 
                title="Environmental Assessment"
                description="Part 2 of 3: Evaluate your organization's environmental practices."
                type="env"
                questions={combinedQuestions.filter(q => 
                  ['carbon_emissions', 'renewable_energy', 'environmental_policy'].includes(q.id)
                )}
              />
              <div className="flex justify-end mt-6">
                <Button 
                  onClick={() => setSelectedTab('social')}
                  className="bg-esg-soc hover:bg-esg-soc/90"
                >
                  Continue to Social Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="social" className="animate-fade-in">
              <Calculator 
                title="Social & Integration Assessment"
                description="Part 3 of 3: Evaluate your organization's social practices and overall ESG integration."
                type="combined"
                questions={combinedQuestions.filter(q => 
                  ['workforce_diversity', 'health_safety', 'human_rights_policy', 
                   'esg_reporting', 'esg_targets', 'stakeholder_engagement'].includes(q.id)
                )}
              />
              <div className="flex justify-end mt-6">
                <Button 
                  onClick={() => setSelectedTab('overview')}
                  variant="outline"
                >
                  Return to Overview
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FullESG;
