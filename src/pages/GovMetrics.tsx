import Calculator from '@/components/Calculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const GovMetrics = () => {
  const govQuestions = [
    {
      id: 'board_independence',
      text: 'What percentage of your board members are independent directors?',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 10,
      idealValue: 75,
      idealRange: [60, 100] as [number, number] // Fix type to tuple
    },
    {
      id: 'board_diversity',
      text: 'What percentage of your board members represent gender diversity?',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 8,
      idealValue: 50,
      idealRange: [40, 60] as [number, number] // Fix type to tuple
    },
    {
      id: 'board_meetings',
      text: 'How many board meetings are held annually?',
      type: 'numeric' as const,
      min: 0,
      max: 20,
      step: 1,
      weight: 5,
      idealValue: 6,
      idealRange: [4, 12] as [number, number] // Fix type to tuple
    },
    {
      id: 'ethics_policy',
      text: 'Does your organization have a documented code of ethics or conduct?',
      type: 'boolean' as const,
      weight: 10,
      idealValue: 1
    },
    {
      id: 'whistleblower_protection',
      text: 'Does your organization have whistleblower protection policies?',
      type: 'boolean' as const,
      weight: 8,
      idealValue: 1
    },
    {
      id: 'ethics_training',
      text: 'What percentage of employees receive ethics training annually?',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 7,
      idealValue: 100,
      idealRange: [90, 100] as [number, number] // Fix type to tuple
    },
    {
      id: 'executive_compensation',
      text: 'What is the ratio of CEO compensation to median employee salary?',
      type: 'numeric' as const,
      min: 1,
      max: 500,
      step: 1,
      weight: 6,
      idealValue: 20,
      idealRange: [1, 50] as [number, number] // Fix type to tuple
    },
    {
      id: 'shareholder_rights',
      text: 'On a scale of 1-10, how would you rate your organization\'s shareholder voting rights policies?',
      type: 'slider' as const,
      min: 1,
      max: 10,
      step: 1,
      weight: 7,
      idealValue: 10,
      idealRange: [7, 10] as [number, number] // Fix type to tuple
    },
    {
      id: 'risk_management',
      text: 'Does your organization have a formal risk management framework?',
      type: 'boolean' as const,
      weight: 8,
      idealValue: 1
    },
    {
      id: 'compliance_audits',
      text: 'How many external compliance audits are conducted annually?',
      type: 'numeric' as const,
      min: 0,
      max: 10,
      step: 1,
      weight: 6,
      idealValue: 2,
      idealRange: [1, 4] as [number, number] // Fix type to tuple
    }
  ];

  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-esg-gov/10 text-esg-gov text-sm font-medium">
              <span className="indicator indicator-gov"></span>
              <span>Governance Metrics</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Governance Performance Assessment
            </h1>
            <p className="text-lg text-muted-foreground">
              Evaluate your organization's leadership structure, ethics, and compliance metrics.
            </p>
          </div>
          
          <Calculator 
            title="Governance Assessment"
            description="Evaluate your organization's governance practices, including board structure, ethics policies, and compliance frameworks."
            type="gov"
            questions={govQuestions}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GovMetrics;
