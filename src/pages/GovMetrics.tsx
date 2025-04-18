import Calculator from '@/components/Calculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const GovMetrics = () => {
  const govQuestions = [
    {
      id: 'board_independence',
      text: 'Board Independence',
      type: 'numeric' as const,
      min: 0,
      max: 100,
      step: 1,
      weight: 10,
      idealValue: 50,
      idealRange: [50, 100] as [number, number],
      description: 'Measures proportion of independent directors on the board. Higher percentage indicates better independence.',
      formula: '(Independent Directors / Total Board Size) × 100',
      formulaInputs: ['independent', 'total'],
      inputLabels: ['Number of Independent Directors', 'Total Board Size'],
      scoringScale: [0, 20, 35, 50, 75, 100]
    },
    {
      id: 'ceo_chair_separation',
      text: 'CEO-Chair Separation',
      type: 'numeric' as const,
      min: 0,
      max: 1,
      step: 1,
      weight: 7,
      idealValue: 1,
      idealRange: [1, 1] as [number, number],
      description: 'Evaluates whether the roles of CEO and Chairperson are separated. Separation avoids concentration of power.',
      formula: 'Binary (1 if separated, 0 if combined)',
      formulaInputs: ['separated'],
      inputLabels: ['Roles Separated? (1 = Yes, 0 = No)'],
      scoringScale: [0, 0, 0, 0, 0, 1]
    },
    {
      id: 'board_diversity',
      text: 'Board Diversity Score',
      type: 'numeric' as const,
      min: 0,
      max: 100,
      step: 1,
      weight: 8,
      idealValue: 60,
      idealRange: [60, 100] as [number, number],
      description: 'Composite score based on gender and experience diversity. Diversity enhances decision-making.',
      formula: '(Gender Diversity Score + Experience Diversity Score) / 2',
      formulaInputs: ['genderScore', 'experienceScore'],
      inputLabels: ['Number of Diverse Gender Representatives', 'Number of Directors with Diverse Experience'],
      scoringScale: [0, 20, 40, 60, 80, 100]
    },
    {
      id: 'audit_committee_independence',
      text: 'Audit Committee Independence',
      type: 'numeric' as const,
      min: 0,
      max: 100,
      step: 1,
      weight: 9,
      idealValue: 75,
      idealRange: [75, 100] as [number, number],
      description: 'Proportion of independent directors in the audit committee. Reduces financial reporting risk.',
      formula: '(Independent Members in Audit Committee / Total Committee Size) × 100',
      formulaInputs: ['independent', 'total'],
      inputLabels: ['Independent Committee Members', 'Total Committee Size'],
      scoringScale: [0, 25, 50, 75, 90, 100]
    },
    {
      id: 'executive_compensation_alignment',
      text: 'Executive Compensation Alignment',
      type: 'numeric' as const,
      min: 0,
      max: 100,
      step: 1,
      weight: 8,
      idealValue: 50,
      idealRange: [50, 100] as [number, number],
      description: 'Alignment of executive pay with long-term performance. Motivates sustainable performance.',
      formula: '(Performance-Linked Compensation / Total Compensation) × 100',
      formulaInputs: ['performanceLinked', 'total'],
      inputLabels: ['Performance-Linked Compensation Amount', 'Total Compensation Amount'],
      scoringScale: [0, 20, 35, 50, 75, 100]
    },
    {
      id: 'anti_corruption_practices',
      text: 'Anti-Corruption Practices Score',
      type: 'numeric' as const,
      min: 0,
      max: 4,
      step: 1,
      weight: 9,
      idealValue: 3,
      idealRange: [3, 4] as [number, number],
      description: 'Measures strength of anti-bribery and whistleblower frameworks including policies for whistleblowing, anti-bribery, ethics training, and third-party due diligence.',
      formula: 'Sum of binary scores (1 point each for whistleblower policy, anti-bribery code, ethics training, third-party due diligence)',
      formulaInputs: ['implementedPolicies'],
      inputLabels: ['Number of Implemented Policies (0-4)'],
      scoringScale: [0, 1, 2, 3, 3.5, 4]
    },
    {
      id: 'shareholder_rights_index',
      text: 'Shareholder Rights Index',
      type: 'numeric' as const,
      min: 0,
      max: 4,
      step: 1,
      weight: 8,
      idealValue: 4,
      idealRange: [3, 4] as [number, number],
      description: 'Measures extent of protections for minority shareholders including proxy access, one share-one vote, annual board voting, and transparent dividend policy.',
      formula: 'Sum of binary scores (1 point each for implemented protection)',
      formulaInputs: ['implementedProtections'],
      inputLabels: ['Number of Implemented Protections (0-4)'],
      scoringScale: [0, 1, 2, 3, 3.5, 4]
    },
    {
      id: 'controversy_score',
      text: 'Controversy Score',
      type: 'numeric' as const,
      min: 0,
      max: 100,
      step: 1,
      weight: 7,
      idealValue: 85,
      idealRange: [85, 100] as [number, number],
      description: 'Weighted score penalizing recent governance controversies. Reflects governance stability.',
      formula: '100 - (Sum of Weighted Controversy Scores / Maximum Possible Score) × 100',
      formulaInputs: ['controversyScore'],
      inputLabels: ['Calculated Controversy Score (0-100)'],
      scoringScale: [0, 50, 70, 85, 95, 100]
    },
    {
      id: 'ownership_concentration',
      text: 'Ownership Concentration Risk',
      type: 'numeric' as const,
      min: 0,
      max: 100,
      step: 1,
      weight: 7,
      idealValue: 30,
      idealRange: [0, 30] as [number, number],
      description: 'Evaluates concentration of ownership by top 3 shareholders. Lower concentration promotes equitable governance.',
      formula: '(Sum of Top 3 Shareholder Ownership Percentages)',
      formulaInputs: ['topThreeOwnership'],
      inputLabels: ['Combined Ownership of Top 3 Shareholders (%)'],
      scoringScale: [100, 80, 60, 40, 20, 0]
    },
    {
      id: 'related_party_transaction',
      text: 'Related Party Transaction Risk',
      type: 'numeric' as const,
      min: 0,
      max: 100,
      step: 1,
      weight: 8,
      idealValue: 5,
      idealRange: [0, 5] as [number, number],
      description: 'Measures risk arising from transactions with related parties. Limits conflict-of-interest scenarios.',
      formula: '(Related Party Transactions Value / Total Revenue) × 100',
      formulaInputs: ['rptValue', 'totalRevenue'],
      inputLabels: ['Related Party Transactions Value', 'Total Revenue'],
      scoringScale: [100, 50, 25, 10, 5, 0]
    },
    {
      id: 'ai_compliance_checks',
      text: 'AI Compliance Checks Completion',
      type: 'numeric' as const,
      min: 0,
      max: 100,
      step: 1,
      weight: 8,
      idealValue: 100,
      idealRange: [80, 100] as [number, number],
      description: 'Measures integrity adherence via automated detection.',
      formula: '(Completed AI Compliance Checks / Total Scheduled Checks) × 100',
      formulaInputs: ['completed', 'total'],
      inputLabels: ['Completed AI Compliance Checks', 'Total Scheduled Checks'],
      scoringScale: [0, 20, 40, 60, 80, 100]
    },
    {
      id: 'digital_disclosures',
      text: 'Digital Governance Disclosures',
      type: 'numeric' as const,
      min: 0,
      max: 20,
      step: 1,
      weight: 7,
      idealValue: 4,
      idealRange: [4, 20] as [number, number],
      description: 'Evaluates shareholder involvement & access through digital disclosures.',
      formula: 'Total Digital Governance Disclosures per Quarter',
      formulaInputs: ['disclosures'],
      inputLabels: ['Number of Digital Disclosures per Quarter'],
      scoringScale: [0, 1, 2, 3, 4, 5]
    },
    {
      id: 'ai_risk_assessments',
      text: 'AI Risk Assessments Frequency',
      type: 'numeric' as const,
      min: 0,
      max: 12,
      step: 1,
      weight: 9,
      idealValue: 12,
      idealRange: [4, 12] as [number, number],
      description: 'Assesses proactive risk monitoring systems through regular AI risk assessments.',
      formula: 'Total AI Risk Assessments Conducted per Year',
      formulaInputs: ['assessments'],
      inputLabels: ['Number of AI Risk Assessments per Year'],
      scoringScale: [0, 1, 2, 4, 6, 12]
    },
    {
      id: 'whistleblower_resolution',
      text: 'Whistleblower Case Resolution',
      type: 'numeric' as const,
      min: 0,
      max: 100,
      step: 1,
      weight: 8,
      idealValue: 90,
      idealRange: [80, 100] as [number, number],
      description: 'Tracks functional reporting & ethical culture through case resolution.',
      formula: '(Resolved Cases with Independent Review / Total Cases) × 100',
      formulaInputs: ['resolved', 'total'],
      inputLabels: ['Resolved Cases with Independent Review', 'Total Cases'],
      scoringScale: [0, 20, 40, 60, 80, 100]
    },
    {
      id: 'blockchain_engagements',
      text: 'Blockchain-Verified Engagements',
      type: 'numeric' as const,
      min: 0,
      max: 50,
      step: 1,
      weight: 7,
      idealValue: 10,
      idealRange: [10, 50] as [number, number],
      description: 'Gauges stakeholder inclusion and auditability through blockchain verification.',
      formula: 'Number of Verified Blockchain Reports per Year',
      formulaInputs: ['reports'],
      inputLabels: ['Number of Blockchain-Verified Reports'],
      scoringScale: [0, 2, 4, 6, 8, 10]
    },
    {
      id: 'esg_automation',
      text: 'ESG Compliance Automation',
      type: 'numeric' as const,
      min: 0,
      max: 100,
      step: 1,
      weight: 8,
      idealValue: 80,
      idealRange: [60, 100] as [number, number],
      description: 'Monitors dynamic ESG governance responsiveness through automation.',
      formula: '(Automated Compliance Tasks / Total ESG Tasks) × 100',
      formulaInputs: ['automated', 'total'],
      inputLabels: ['Number of Automated Compliance Tasks', 'Total ESG Tasks'],
      scoringScale: [0, 20, 40, 60, 80, 100]
    },
    {
      id: 'data_security',
      text: 'Data Security and Privacy Score',
      type: 'numeric' as const,
      min: 0,
      max: 100,
      step: 1,
      weight: 9,
      idealValue: 90,
      idealRange: [80, 100] as [number, number],
      description: 'Ensures integrity of corporate data governance.',
      formula: '[(1 - (Data Breaches / Total Attempts)) × (AI Security Level / 5)] × 100',
      formulaInputs: ['breaches', 'attempts', 'securityLevel'],
      inputLabels: ['Number of Data Breaches', 'Total Attempts', 'AI Security Level (0-5)'],
      scoringScale: [0, 20, 40, 60, 80, 100]
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
