
import Calculator from '@/components/Calculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SocMetrics = () => {
  const socQuestions = [
    {
      id: 'gender_diversity_ratio',
      text: 'What is your gender diversity ratio?',
      type: 'formula' as const,
      weight: 8,
      idealValue: 50,
      idealRange: [40, 60] as [number, number],
      description: 'Measures the percentage of female employees in the organization',
      formula: '(Number of Female Employees / Total Employees) × 100',
      formulaInputs: ['femaleEmployees', 'totalEmployees'],
      inputLabels: ['Number of Female Employees', 'Total Employees']
    },
    {
      id: 'employee_welfare_coverage',
      text: 'What is your employee benefit coverage rate?',
      type: 'formula' as const,
      weight: 7,
      idealValue: 100,
      idealRange: [80, 100] as [number, number],
      description: 'Measures the percentage of employees covered under all social benefits',
      formula: '(Employees Covered Under All Social Benefits / Total Employees) × 100',
      formulaInputs: ['coveredEmployees', 'totalEmployees'],
      inputLabels: ['Employees Covered Under Social Benefits', 'Total Employees']
    },
    {
      id: 'training_skill_development',
      text: 'What is your skill development coverage?',
      type: 'formula' as const,
      weight: 7,
      idealValue: 100,
      idealRange: [70, 100] as [number, number],
      description: 'Measures the percentage of employees receiving skill training',
      formula: '(Employees Receiving Skill Training / Total Employees) × 100',
      formulaInputs: ['trainedEmployees', 'totalEmployees'],
      inputLabels: ['Employees Receiving Skill Training', 'Total Employees']
    },
    {
      id: 'health_safety_coverage',
      text: 'What is your occupational safety compliance rate?',
      type: 'formula' as const,
      weight: 9,
      idealValue: 100,
      idealRange: [90, 100] as [number, number],
      description: 'Measures the percentage of employees covered under health & safety programs',
      formula: '(Employees Covered Under Health & Safety Programs / Total Employees) × 100',
      formulaInputs: ['safetyCoveredEmployees', 'totalEmployees'],
      inputLabels: ['Employees Covered Under Health & Safety', 'Total Employees']
    },
    {
      id: 'grievance_redressal',
      text: 'What is your grievance resolution rate?',
      type: 'formula' as const,
      weight: 6,
      idealValue: 100,
      idealRange: [80, 100] as [number, number],
      description: 'Measures the percentage of complaints resolved out of total received',
      formula: '(Complaints Resolved / Total Complaints Received) × 100',
      formulaInputs: ['resolvedComplaints', 'totalComplaints'],
      inputLabels: ['Complaints Resolved', 'Total Complaints Received']
    },
    {
      id: 'differently_abled_inclusion',
      text: 'What is your inclusion ratio for differently-abled employees?',
      type: 'formula' as const,
      weight: 7,
      idealValue: 7,
      idealRange: [3, 10] as [number, number],
      description: 'Measures the percentage of differently-abled employees in the organization',
      formula: '(Differently-Abled Employees / Total Employees) × 100',
      formulaInputs: ['differentlyAbledEmployees', 'totalEmployees'],
      inputLabels: ['Differently-Abled Employees', 'Total Employees']
    },
    {
      id: 'csr_spend_index',
      text: 'What is your CSR allocation rate?',
      type: 'formula' as const,
      weight: 6,
      idealValue: 5,
      idealRange: [2, 10] as [number, number],
      description: 'Measures the percentage of net profit allocated to CSR activities',
      formula: '(CSR Spend / Net Profit) × 100',
      formulaInputs: ['csrSpend', 'netProfit'],
      inputLabels: ['CSR Spend', 'Net Profit']
    },
    {
      id: 'parental_leave_return',
      text: 'What is your parental leave return rate?',
      type: 'formula' as const,
      weight: 6,
      idealValue: 100,
      idealRange: [80, 100] as [number, number],
      description: 'Measures the percentage of employees returning to work after parental leave',
      formula: '(Employees Returning to Work After Leave / Employees Taking Leave) × 100',
      formulaInputs: ['returningEmployees', 'leaveTakingEmployees'],
      inputLabels: ['Employees Returning After Leave', 'Employees Taking Leave']
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
