
import Calculator from '@/components/Calculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const GovMetrics = () => {
  const govQuestions = [
    {
      id: 'ethical_business_conduct',
      text: 'What percentage completion of AI compliance checks does your organization have?',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 10,
      idealValue: 100,
      idealRange: [80, 100] as [number, number],
      description: 'Measures integrity adherence via automated detection'
    },
    {
      id: 'board_composition',
      text: 'What percentage of your board consists of independent & diverse members?',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 10,
      idealValue: 60,
      idealRange: [60, 100] as [number, number],
      description: 'Indicates impartiality & inclusivity in leadership'
    },
    {
      id: 'shareholder_rights',
      text: 'How many digital governance disclosures does your organization provide per quarter?',
      type: 'numeric' as const,
      min: 0,
      max: 10,
      step: 1,
      weight: 8,
      idealValue: 4,
      idealRange: [4, 10] as [number, number],
      description: 'Evaluates shareholder involvement & access'
    },
    {
      id: 'risk_management',
      text: 'How many AI risk assessments does your organization conduct per year?',
      type: 'numeric' as const,
      min: 0,
      max: 12,
      step: 1,
      weight: 8,
      idealValue: 12,
      idealRange: [4, 12] as [number, number],
      description: 'Assesses proactive risk monitoring systems'
    },
    {
      id: 'whistleblower_mechanism',
      text: 'What percentage of whistleblower cases are resolved with independent review?',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 9,
      idealValue: 100,
      idealRange: [80, 100] as [number, number],
      description: 'Tracks functional reporting & ethical culture'
    },
    {
      id: 'stakeholder_engagement',
      text: 'How many verified blockchain reports does your organization publish per year?',
      type: 'numeric' as const,
      min: 0,
      max: 20,
      step: 1,
      weight: 7,
      idealValue: 12,
      idealRange: [6, 20] as [number, number],
      description: 'Gauges stakeholder inclusion and auditability'
    },
    {
      id: 'esg_oversight',
      text: 'What percentage of ESG compliance tasks are automated in your organization?',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 9,
      idealValue: 100,
      idealRange: [70, 100] as [number, number],
      description: 'Monitors dynamic ESG governance responsiveness'
    },
    {
      id: 'data_security',
      text: 'Rate your organization\'s data security level (considering breaches and AI security coverage)',
      type: 'slider' as const,
      min: 1,
      max: 5,
      step: 1,
      weight: 10,
      idealValue: 5,
      idealRange: [4, 5] as [number, number],
      description: 'Ensures integrity of corporate data governance'
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
            description="Evaluate your organization's governance practices using our data-driven framework focused on ethics, board composition, risk management, and stakeholder engagement."
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
