import { Mountain, Sun, Wind, Factory } from 'lucide-react';
import { regionalMiningData, globalPrecedents } from '../data/bpiData';
import RealTimeMiningCalculator from './RealTimeMiningCalculator';

const MiningSection = () => {

  const regions = regionalMiningData.map(region => ({
    icon: region.type === 'hydropower' ? Mountain : 
          region.type === 'solar' ? Sun : 
          region.type === 'wind' ? Wind : Factory,
    title: region.name,
    description: region.location,
    example: region.potential + ' (' + region.annualOutput + ')',
    color: region.type === 'hydropower' ? 'text-blue-500' : 
           region.type === 'solar' ? 'text-yellow-500' : 
           region.type === 'wind' ? 'text-green-500' : 'text-gray-500'
  }));

  const precedents = globalPrecedents.slice(0, 3).map(precedent => ({
    country: precedent.country,
    description: precedent.description
  }));

  return (
    <section id="mining" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mining Regions */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {regions.map((region, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl bg-gray-50`}>
                  <region.icon className={`h-8 w-8 ${region.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 font-inter">
                    {region.title}
                  </h3>
                  <p className="text-gray-600 mb-3 font-lora">
                    {region.description}
                  </p>
                  <p className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full inline-block">
                    {region.example}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real-Time Calculator Widget */}
        <div className="mb-16">
          <RealTimeMiningCalculator />
        </div>

        {/* Global Precedents */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-semibold mb-6 font-inter">Global Precedents</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {precedents.map((precedent, index) => (
              <div key={index} className="text-center">
                <h4 className="text-lg font-semibold text-orange-400 mb-2">
                  {precedent.country}
                </h4>
                <p className="text-gray-300 font-lora">
                  {precedent.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiningSection;