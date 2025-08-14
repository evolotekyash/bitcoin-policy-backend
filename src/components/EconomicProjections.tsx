import { TrendingUp, Calendar, MapPin, Users } from 'lucide-react';
import { economicProjections } from '../data/bpiData';

const EconomicProjections = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {economicProjections.map((projection, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-orange-500"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="h-8 w-8 text-orange-500" />
                <h3 className="text-xl font-semibold text-gray-900 font-inter">
                  {projection.timeframe}
                </h3>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-orange-600">
                      {projection.btcProduction.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">BTC Production</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 mb-1">₹</div>
                    <p className="text-2xl font-bold text-green-600">
                      {projection.valueInCrores.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Crore Value</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {projection.jobsCreated.toLocaleString()} Jobs Created
                      </p>
                      <p className="text-sm text-gray-600">Direct & indirect employment</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Target Regions</p>
                      <p className="text-sm text-gray-600">
                        {projection.regions.join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-900 mb-1">Energy Utilization</p>
                    <p className="text-sm text-gray-600">{projection.energyUtilized}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Cumulative Impact by 2030</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <p className="text-3xl font-bold">150K+</p>
                <p className="text-orange-100">BTC Annual Production</p>
              </div>
              <div>
                <p className="text-3xl font-bold">₹1.5L+</p>
                <p className="text-orange-100">Crore Annual Value</p>
              </div>
              <div>
                <p className="text-3xl font-bold">3L+</p>
                <p className="text-orange-100">Total Jobs</p>
              </div>
              <div>
                <p className="text-3xl font-bold">30 TWh</p>
                <p className="text-orange-100">Energy Monetized</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EconomicProjections;
