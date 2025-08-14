import { Globe, ArrowRightLeft, DollarSign, Users } from 'lucide-react';

const GlobalIntegration = () => {
  const benefits = [
    {
      icon: Users,
      title: 'BRICS & Multi-lateral Trade',
      description: 'Facilitate bilateral trade settlements with BRICS nations using Bitcoin as neutral reserve currency'
    },
    {
      icon: DollarSign,
      title: 'Forex & Remittance Savings',
      description: 'Save ₹50,000+ crore annually on international transfers and reduce forex dependency'
    },
    {
      icon: ArrowRightLeft,
      title: 'SWIFT Independence',
      description: 'Reduce reliance on traditional banking networks for cross-border transactions and sanctions risk'
    },
    {
      icon: Globe,
      title: 'Sovereign Digital Economy',
      description: 'Connect to global Bitcoin economy while maintaining monetary sovereignty and strategic autonomy'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-100 transition-colors duration-300">
                  <benefit.icon className="h-8 w-8 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 font-inter">
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
    </section>
  );
};

export default GlobalIntegration;