
import Calculator from '@/components/Calculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const GovMetrics = () => {
  const govQuestions = [
    {
      id: 'ethical_business_conduct',
      text: 'Ethical Business Conduct: AI Compliance Checks',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 10,
      idealValue: 100,
      idealRange: [80, 100] as [number, number],
      description: 'Measures integrity adherence via automated detection. 0: Not implemented, 5: Fully integrated & real-time.',
      formula: '(Completed AI Compliance Checks / Total Scheduled Checks) × 100',
      formulaInputs: ['completed', 'total'],
      inputLabels: ['Completed AI Compliance Checks', 'Total Scheduled Checks'],
      scoringScale: [0, 20, 40, 60, 80, 100] // Thresholds for scores 0-5
    },
    {
      id: 'board_composition',
      text: 'Board Composition & Independence',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 10,
      idealValue: 60,
      idealRange: [60, 100] as [number, number],
      description: 'Indicates impartiality & inclusivity in leadership. 0: <20%, 5: >60% diverse and independent.',
      formula: '(No. of Independent & Diverse Directors / Total Board Members) × 100',
      formulaInputs: ['independent', 'total'],
      inputLabels: ['No. of Independent & Diverse Directors', 'Total Board Members'],
      scoringScale: [0, 20, 30, 40, 50, 60] // Thresholds for scores 0-5
    },
    {
      id: 'shareholder_rights',
      text: 'Shareholder Rights & Transparency',
      type: 'numeric' as const,
      min: 0,
      max: 10,
      step: 1,
      weight: 8,
      idealValue: 4,
      idealRange: [4, 10] as [number, number],
      description: 'Evaluates shareholder involvement & access. 0: <1, 5: >4 per quarter, real-time enabled.',
      formula: 'Total Digital Governance Disclosures / Quarter',
      formulaInputs: ['disclosures'],
      inputLabels: ['Digital Governance Disclosures per Quarter'],
      scoringScale: [0, 1, 2, 3, 4, 5] // Thresholds for scores 0-5
    },
    {
      id: 'risk_management',
      text: 'Risk Management & Internal Controls',
      type: 'numeric' as const,
      min: 0,
      max: 12,
      step: 1,
      weight: 8,
      idealValue: 12,
      idealRange: [4, 12] as [number, number],
      description: 'Assesses proactive risk monitoring systems. 0: None, 5: Monthly automated reviews (12/year).',
      formula: 'Total AI Risk Assessments Conducted / Year',
      formulaInputs: ['assessments'],
      inputLabels: ['AI Risk Assessments per Year'],
      scoringScale: [0, 2, 4, 6, 9, 12] // Thresholds for scores 0-5
    },
    {
      id: 'whistleblower_mechanism',
      text: 'Whistleblower Mechanism',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 9,
      idealValue: 100,
      idealRange: [80, 100] as [number, number],
      description: 'Tracks functional reporting & ethical culture. 0: None, 5: >10/year with third-party validation.',
      formula: '(Whistleblower Cases Resolved with Independent Review / Total Cases) × 100',
      formulaInputs: ['resolved', 'total'],
      inputLabels: ['Cases Resolved with Independent Review', 'Total Whistleblower Cases'],
      scoringScale: [0, 20, 40, 60, 80, 100] // Thresholds for scores 0-5
    },
    {
      id: 'stakeholder_engagement',
      text: 'Stakeholder Engagement',
      type: 'numeric' as const,
      min: 0,
      max: 20,
      step: 1,
      weight: 7,
      idealValue: 12,
      idealRange: [6, 20] as [number, number],
      description: 'Gauges stakeholder inclusion and auditability. 0: None, 5: Continuous disclosure system.',
      formula: 'No. of Verified Blockchain Reports / Year',
      formulaInputs: ['reports'],
      inputLabels: ['Verified Blockchain Reports per Year'],
      scoringScale: [0, 3, 6, 10, 15, 20] // Thresholds for scores 0-5
    },
    {
      id: 'esg_oversight',
      text: 'ESG Oversight & Compliance',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 9,
      idealValue: 100,
      idealRange: [70, 100] as [number, number],
      description: 'Monitors dynamic ESG governance responsiveness. 0: Manual, 5: Fully automated monitoring.',
      formula: '(Automated Compliance Tasks / Total ESG Tasks) × 100',
      formulaInputs: ['automated', 'total'],
      inputLabels: ['Automated Compliance Tasks', 'Total ESG Tasks'],
      scoringScale: [0, 20, 40, 60, 80, 100] // Thresholds for scores 0-5
    },
    {
      id: 'data_security',
      text: 'Data Security & Privacy',
      type: 'slider' as const,
      min: 0,
      max: 5,
      step: 0.5,
      weight: 10,
      idealValue: 5,
      idealRange: [4, 5] as [number, number],
      description: 'Ensures integrity of corporate data governance. 0: Frequent breaches, 5: Zero with AI-level 5.',
      formula: '[(1 - (Data Breaches / Total Attempts)) × (AI Security Level / 5)] × 5',
      formulaInputs: ['breaches', 'attempts', 'securityLevel'],
      inputLabels: ['Number of Data Breaches', 'Total Attempted Breaches', 'AI Security Level (1-5)'],
      scoringScale: [0, 1, 2, 3, 4, 5] // Direct 0-5 scale
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
