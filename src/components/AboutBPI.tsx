const AboutBPI = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Brand Statement */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-100 to-orange-50 rounded-full border border-orange-200 mb-8">
            <span className="text-sm font-bold text-orange-700 font-inter">
              🇮🇳 Shaping India's Bitcoin Future
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-inter leading-tight">
            Pioneering Bitcoin Policy in <span className="text-orange-500">India</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto font-lora leading-relaxed">
            The Bitcoin Policy Institute India is the nation's premier think tank dedicated to advancing 
            Bitcoin adoption through evidence-based policy research, strategic energy utilization, 
            and institutional education.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Our Mission */}
          <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-orange-600 font-bold text-xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-inter">Our Mission</h3>
            </div>
            <p className="text-gray-600 font-lora leading-relaxed mb-6">
              To transform India into a global Bitcoin leader by converting stranded energy into strategic 
              Bitcoin reserves, creating comprehensive policy frameworks, and building institutional 
              knowledge for sustainable Bitcoin adoption.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Policy research and advocacy</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Energy optimization strategies</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Institutional education programs</span>
              </li>
            </ul>
          </div>

          {/* Our Vision */}
          <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 border border-orange-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-orange-600 font-bold text-xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-inter">Our Vision</h3>
            </div>
            <p className="text-gray-600 font-lora leading-relaxed mb-6">
              An India where Bitcoin serves as a cornerstone of financial sovereignty, energy efficiency, 
              and economic innovation, positioning the nation as a global leader in the Bitcoin economy.
            </p>
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <h4 className="font-semibold text-gray-900 mb-2 font-inter">Strategic Goals 2030</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <span>1% of forex reserves in Bitcoin</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <span>25-30 TWh energy optimization</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <span>2-3 lakh job creation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBPI;
