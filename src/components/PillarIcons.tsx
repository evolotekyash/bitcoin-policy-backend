import { Zap, Scale, TrendingUp, GraduationCap, Shield } from 'lucide-react';

const PillarIcons = () => {
  const pillars = [
    {
      icon: Zap,
      title: 'The Sovereign Mining Initiative',
      description: 'Creating a playbook for states to convert renewable energy into a strategic asset.'
    },
    {
      icon: Scale,
      title: 'Policy Advocacy & Research',
      description: 'Serving as a credible, data-driven resource for government bodies.'
    },
    {
      icon: TrendingUp,
      title: 'The Strategic Reserve Initiative',
      description: 'Building the case for Bitcoin as a national and corporate treasury asset.'
    },
    {
      icon: GraduationCap,
      title: 'Education & Self-Sovereignty',
      description: 'Demystifying Bitcoin for the public and promoting financial literacy.'
    },
    {
      icon: Shield,
      title: 'Enabling Commerce & Payments',
      description: 'Accelerating Bitcoin\'s use for low-cost, global transactions.'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-orange-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-inter mb-6">
            Five Pillars of Bitcoin Policy
          </h2>
          <p className="text-xl text-gray-600 font-lora max-w-4xl mx-auto leading-relaxed">
            A comprehensive framework for integrating Bitcoin into India's economic strategy
          </p>
        </div>

        {/* First Row - 3 cards */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {pillars.slice(0, 3).map((pillar, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-2xl transition-all duration-300 w-full sm:w-80 lg:w-72 xl:w-80 transform hover:-translate-y-2"
            >
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl mb-8 group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-300">
                <pillar.icon className="h-10 w-10 text-orange-600 group-hover:text-orange-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-inter group-hover:text-orange-700 transition-colors duration-300 leading-tight">
                {pillar.title}
              </h3>
              <p className="text-gray-600 font-lora leading-relaxed text-base">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Second Row - 2 cards centered */}
        <div className="flex flex-wrap justify-center gap-8">
          {pillars.slice(3).map((pillar, index) => (
            <div
              key={index + 3}
              className="group p-8 rounded-3xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-2xl transition-all duration-300 w-full sm:w-80 lg:w-72 xl:w-80 transform hover:-translate-y-2"
            >
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl mb-8 group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-300">
                <pillar.icon className="h-10 w-10 text-orange-600 group-hover:text-orange-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-inter group-hover:text-orange-700 transition-colors duration-300 leading-tight">
                {pillar.title}
              </h3>
              <p className="text-gray-600 font-lora leading-relaxed text-base">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarIcons;