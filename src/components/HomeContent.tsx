import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeContent = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 bg-orange-50 rounded-full border border-orange-200 mb-8">
            <span className="text-sm font-semibold text-orange-700 font-inter">
              ⚡ India's Energy Transformation Strategy
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-inter">
            Converting Stranded Energy into Strategic Bitcoin Reserves
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10 font-lora">
            From 20,000 MW of Himalayan hydropower to 50,000 MW of solar curtailment, 
            India can convert 25-30 TWh of wasted energy annually into sovereign Bitcoin wealth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/mining"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold font-inter rounded-xl hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              Explore Mining Strategy
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/policy"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold font-inter rounded-xl hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200 backdrop-blur-sm"
            >
              View Policy Research
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContent;
