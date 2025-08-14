import { Shield, TrendingUp, Globe2 } from 'lucide-react';

const StrategicReserve = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'Monetary Sovereignty',
      description: 'Reduce dependency on foreign currency reserves and strengthen national financial independence'
    },
    {
      icon: TrendingUp,
      title: 'Inflation Hedge',
      description: 'Bitcoin\'s fixed supply provides protection against currency debasement and inflation'
    },
    {
      icon: Globe2,
      title: 'Neutral Reserve Asset',
      description: 'Apolitical, borderless reserve that cannot be frozen or sanctioned by foreign powers'
    }
  ];

  return (
    <section id="reserve" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="group p-6 rounded-2xl bg-gradient-to-r from-orange-50 to-orange-25 border border-orange-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-orange-500 rounded-xl group-hover:bg-orange-600 transition-colors duration-300 flex-shrink-0">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-h-0">
                      <h3 className="text-xl font-bold mb-3 font-inter text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 font-lora leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Visual */}
          <div className="relative">
            <div className="w-full bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8 border border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-300 sticky top-24 h-full flex flex-col justify-center">
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg">
                    <span className="text-3xl font-bold text-white">₿</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 font-inter">National Bitcoin Reserve</h3>
                  <p className="text-gray-600 font-lora">Building sovereign digital wealth through strategic mining operations</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="group bg-white rounded-xl p-6 text-center shadow-md border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                    <p className="text-2xl font-bold text-orange-500 mb-1 group-hover:text-orange-600 transition-colors duration-300">150K+</p>
                    <p className="text-sm font-medium text-gray-600">BTC Annual Potential</p>
                  </div>
                  <div className="group bg-white rounded-xl p-6 text-center shadow-md border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                    <p className="text-2xl font-bold text-orange-500 mb-1 group-hover:text-orange-600 transition-colors duration-300">₹1.5L+</p>
                    <p className="text-sm font-medium text-gray-600">Crore Annual Value</p>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Real-time potential calculations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategicReserve;