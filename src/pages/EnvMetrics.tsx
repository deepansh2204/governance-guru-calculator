
import Calculator from '@/components/Calculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const EnvMetrics = () => {
  const envQuestions = [
    {
      id: 'carbon_emissions_intensity',
      text: 'What is your carbon emissions intensity?',
      type: 'formula' as const,
      weight: 10,
      idealValue: 0.5,
      idealRange: [0, 1] as [number, number],
      description: 'Measures greenhouse gas emissions relative to revenue',
      formula: '(Total GHG Emissions in CO₂e / Total Revenue) × 1000',
      formulaInputs: ['ghgEmissions', 'totalRevenue'],
      inputLabels: ['Total GHG Emissions (CO₂e)', 'Total Revenue']
    },
    {
      id: 'energy_efficiency',
      text: 'What is your energy efficiency rate?',
      type: 'formula' as const,
      weight: 8,
      idealValue: 95,
      idealRange: [80, 100] as [number, number],
      description: 'Measures units of output relative to energy consumed',
      formula: '(Units of Output / Total Energy Consumed) × 100',
      formulaInputs: ['outputUnits', 'energyConsumed'],
      inputLabels: ['Units of Output', 'Total Energy Consumed']
    },
    {
      id: 'water_usage_efficiency',
      text: 'What is your water use efficiency?',
      type: 'formula' as const,
      weight: 7,
      idealValue: 100,
      idealRange: [50, 150] as [number, number],
      description: 'Measures total output relative to water consumption',
      formula: 'Total Output / Total Water Consumption in KL',
      formulaInputs: ['totalOutput', 'waterConsumption'],
      inputLabels: ['Total Output', 'Total Water Consumption (KL)']
    },
    {
      id: 'waste_management',
      text: 'What is your waste reuse & recycling rate?',
      type: 'formula' as const,
      weight: 7,
      idealValue: 90,
      idealRange: [70, 100] as [number, number],
      description: 'Measures percentage of waste reused or recycled',
      formula: '(Reused + Recycled Waste / Total Waste Generated) × 100',
      formulaInputs: ['reusedRecycledWaste', 'totalWaste'],
      inputLabels: ['Reused + Recycled Waste', 'Total Waste Generated']
    },
    {
      id: 'sustainable_sourcing',
      text: 'What is your sustainable sourcing ratio?',
      type: 'formula' as const,
      weight: 6,
      idealValue: 90,
      idealRange: [60, 100] as [number, number],
      description: 'Measures percentage of sustainably sourced inputs',
      formula: '(Sustainably Sourced Inputs / Total Inputs) × 100',
      formulaInputs: ['sustainableInputs', 'totalInputs'],
      inputLabels: ['Sustainably Sourced Inputs', 'Total Inputs']
    },
    {
      id: 'eco_friendly_packaging',
      text: 'What is your green packaging rate?',
      type: 'formula' as const,
      weight: 6,
      idealValue: 90,
      idealRange: [60, 100] as [number, number],
      description: 'Measures percentage of eco-friendly packaging material used',
      formula: '(Eco-Friendly Packaging Material Used / Total Packaging Material) × 100',
      formulaInputs: ['ecoFriendlyPackaging', 'totalPackaging'],
      inputLabels: ['Eco-Friendly Packaging Material', 'Total Packaging Material']
    },
    {
      id: 'biodiversity_protection',
      text: 'What is your biodiversity investment ratio?',
      type: 'formula' as const,
      weight: 5,
      idealValue: 30,
      idealRange: [10, 50] as [number, number],
      description: 'Measures investment in biodiversity protection as percentage of CSR spend',
      formula: '(Amount Invested in Biodiversity Protection / Total CSR Spend) × 100',
      formulaInputs: ['biodiversityInvestment', 'totalCSRSpend'],
      inputLabels: ['Investment in Biodiversity Protection', 'Total CSR Spend']
    },
    {
      id: 'renewable_energy',
      text: 'What is your renewable energy share?',
      type: 'formula' as const,
      weight: 8,
      idealValue: 80,
      idealRange: [50, 100] as [number, number],
      description: 'Measures percentage of energy consumption from renewable sources',
      formula: '(Renewable Energy Consumption / Total Energy Consumption) × 100',
      formulaInputs: ['renewableEnergy', 'totalEnergy'],
      inputLabels: ['Renewable Energy Consumption', 'Total Energy Consumption']
    }
  ];

  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-esg-env/10 text-esg-env text-sm font-medium">
              <span className="indicator indicator-env"></span>
              <span>Environmental Metrics</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Environmental Performance Assessment
            </h1>
            <p className="text-lg text-muted-foreground">
              Evaluate your organization's environmental impact, resource usage, and sustainability initiatives.
            </p>
          </div>
          
          <Calculator 
            title="Environmental Assessment"
            description="Evaluate your organization's environmental practices, including resource efficiency, emissions reduction, and sustainability policies."
            type="env"
            questions={envQuestions}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EnvMetrics;
