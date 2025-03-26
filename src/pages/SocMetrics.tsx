import Calculator from '@/components/Calculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SocMetrics = () => {
  const socQuestions = [
    {
      id: 'workforce_diversity',
      text: 'What percentage of your workforce represents gender diversity?',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 8,
      idealValue: 50,
      idealRange: [40, 60] as [number, number] // Fix type to tuple
    },
    {
      id: 'management_diversity',
      text: 'What percentage of your management team represents gender diversity?',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 8,
      idealValue: 50,
      idealRange: [40, 60] as [number, number] // Fix type to tuple
    },
    {
      id: 'minority_representation',
      text: 'What percentage of your workforce represents ethnic or racial diversity?',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 8,
      idealValue: 40,
      idealRange: [30, 70] as [number, number] // Fix type to tuple
    },
    {
      id: 'employee_turnover',
      text: 'What is your annual employee turnover rate (percentage)?',
      type: 'numeric' as const,
      min: 0,
      max: 100,
      step: 1,
      weight: 6,
      idealValue: 10,
      idealRange: [5, 15] as [number, number] // Fix type to tuple
    },
    {
      id: 'pay_equity',
      text: 'What is the pay ratio between highest and lowest paid employees?',
      type: 'numeric' as const,
      min: 1,
      max: 500,
      step: 1,
      weight: 7,
      idealValue: 20,
      idealRange: [1, 50] as [number, number] // Fix type to tuple
    },
    {
      id: 'health_safety',
      text: 'How many workplace safety incidents occurred in the past year per 100 employees?',
      type: 'numeric' as const,
      min: 0,
      max: 20,
      step: 0.1,
      weight: 9,
      idealValue: 0,
      idealRange: [0, 1] as [number, number] // Fix type to tuple
    },
    {
      id: 'community_investment',
      text: 'What percentage of pre-tax profits is invested in community initiatives?',
      type: 'slider' as const,
      min: 0,
      max: 10,
      step: 0.1,
      weight: 6,
      idealValue: 2,
      idealRange: [1, 5] as [number, number] // Fix type to tuple
    },
    {
      id: 'human_rights_policy',
      text: 'Does your organization have a formal human rights policy?',
      type: 'boolean' as const,
      weight: 9,
      idealValue: 1
    },
    {
      id: 'supplier_code',
      text: 'Does your organization have a supplier code of conduct that addresses social issues?',
      type: 'boolean' as const,
      weight: 7,
      idealValue: 1
    },
    {
      id: 'training_development',
      text: 'What is the average number of training hours per employee annually?',
      type: 'numeric' as const,
      min: 0,
      max: 100,
      step: 1,
      weight: 5,
      idealValue: 40,
      idealRange: [20, 80] as [number, number] // Fix type to tuple
    }
  ];

  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-esg-soc/10 text-esg-soc text-sm font-medium">
              <span className="indicator indicator-soc"></span>
              <span>Social Metrics</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Social Performance Assessment
            </h1>
            <p className="text-lg text-muted-foreground">
              Evaluate your organization's social impact, diversity initiatives, and community engagement.
            </p>
          </div>
          
          <Calculator 
            title="Social Assessment"
            description="Evaluate your organization's social practices, including workforce diversity, employee well-being, and community engagement."
            type="soc"
            questions={socQuestions}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SocMetrics;
