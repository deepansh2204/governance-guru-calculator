
import Calculator from '@/components/Calculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const EnvMetrics = () => {
  const envQuestions = [
    {
      id: 'carbon_emissions',
      text: 'What are your organization\'s annual carbon emissions in metric tons of CO2 equivalent per million dollars of revenue?',
      type: 'numeric' as const,
      min: 0,
      max: 1000,
      step: 1,
      weight: 10,
      idealValue: 0,
      idealRange: [0, 100]
    },
    {
      id: 'renewable_energy',
      text: 'What percentage of your energy consumption comes from renewable sources?',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 8,
      idealValue: 100,
      idealRange: [50, 100]
    },
    {
      id: 'waste_reduction',
      text: 'What percentage of your waste is diverted from landfills (recycled, reused, composted)?',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 7,
      idealValue: 100,
      idealRange: [60, 100]
    },
    {
      id: 'water_consumption',
      text: 'What is your annual water consumption in cubic meters per million dollars of revenue?',
      type: 'numeric' as const,
      min: 0,
      max: 10000,
      step: 10,
      weight: 6,
      idealValue: 0,
      idealRange: [0, 1000]
    },
    {
      id: 'environmental_policy',
      text: 'Does your organization have a formal environmental policy?',
      type: 'boolean' as const,
      weight: 8,
      idealValue: 1
    },
    {
      id: 'climate_risk_assessment',
      text: 'Has your organization conducted a climate risk assessment?',
      type: 'boolean' as const,
      weight: 7,
      idealValue: 1
    },
    {
      id: 'emission_reduction_targets',
      text: 'Does your organization have specific, time-bound emission reduction targets?',
      type: 'boolean' as const,
      weight: 9,
      idealValue: 1
    },
    {
      id: 'sustainable_procurement',
      text: 'What percentage of your suppliers meet your sustainability criteria?',
      type: 'slider' as const,
      min: 0,
      max: 100,
      step: 5,
      weight: 5,
      idealValue: 100,
      idealRange: [70, 100]
    },
    {
      id: 'environmental_compliance',
      text: 'How many environmental compliance violations has your organization had in the past year?',
      type: 'numeric' as const,
      min: 0,
      max: 50,
      step: 1,
      weight: 8,
      idealValue: 0,
      idealRange: [0, 0]
    },
    {
      id: 'biodiversity_impact',
      text: 'On a scale of 1-10, how would you rate your organization\'s efforts to protect biodiversity?',
      type: 'slider' as const,
      min: 1,
      max: 10,
      step: 1,
      weight: 6,
      idealValue: 10,
      idealRange: [7, 10]
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
