import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          {/* Content */}
          <div className="space-y-10 max-w-5xl mx-auto">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 font-inter leading-[1.1] tracking-tight">
                Converting India's 
                <span className="block text-gray-800 mt-2">Stranded Energy into</span>
                <span className="block text-orange-500 mt-2 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Strategic Bitcoin Reserves
                </span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl md:text-2xl text-gray-600 font-inter leading-relaxed mb-4 font-medium">
                  From <span className="font-semibold text-gray-800">20,000 MW of Himalayan hydropower</span> to{' '}
                  <span className="font-semibold text-gray-800">50,000 MW of solar curtailment</span>, 
                  India can convert <span className="font-bold text-orange-600">25-30 TWh</span> of wasted 
                  energy annually into sovereign Bitcoin wealth.
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
                  <span className="text-sm font-semibold text-orange-700 font-inter">
                    ⚡ Turning waste into strategic advantage
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/mining"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold font-inter rounded-xl hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                Explore Mining Plan
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/policy"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold font-inter rounded-xl hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200 backdrop-blur-sm"
              >
                Policy Library
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;