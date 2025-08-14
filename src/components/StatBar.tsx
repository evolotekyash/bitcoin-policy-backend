import { TrendingUp, Zap, DollarSign } from 'lucide-react';
import { keyStatistics } from '../data/bpiData';

const StatBar = () => {
  const stats = [
    {
      icon: Zap,
      label: 'India wastes annually',
      value: keyStatistics.energyWasted,
      color: 'text-red-500'
    },
    {
      icon: TrendingUp,
      label: 'Bitcoin mining potential',
      value: keyStatistics.btcPotential,
      color: 'text-orange-500'
    },
    {
      icon: DollarSign,
      label: 'Strategic reserve value',
      value: keyStatistics.annualValue,
      color: 'text-green-500'
    }
  ];

  return (
    <section className="py-12 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold font-inter">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatBar;