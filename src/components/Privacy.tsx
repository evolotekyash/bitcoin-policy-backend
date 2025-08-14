import React from 'react';
import { Shield, Lock, Eye, Scale } from 'lucide-react';

const Privacy = () => {
  const principles = [
    {
      icon: Lock,
      title: 'Financial Privacy',
      description: 'The right to transact privately is fundamental to personal freedom and dignity'
    },
    {
      icon: Scale,
      title: 'Constitutional Rights',
      description: 'Supreme Court jurisprudence supports privacy as a fundamental right under Article 21'
    },
    {
      icon: Eye,
      title: 'Surveillance Resistance',
      description: 'Bitcoin provides protection against excessive financial surveillance and control'
    },
    {
      icon: Shield,
      title: 'Civil Liberties',
      description: 'Preserving the right to financial self-sovereignty and economic freedom'
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-inter mb-4">
            Privacy & Civil Liberties
          </h2>
          <p className="text-xl text-gray-600 font-lora max-w-4xl mx-auto">
            Bitcoin safeguards the right to transact freely. Financial privacy is a constitutional 
            right under India's Supreme Court jurisprudence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-orange-50 rounded-xl">
                  <principle.icon className="h-8 w-8 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 font-inter">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600 font-lora leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-semibold mb-4 font-inter">
            Protecting Financial Freedom
          </h3>
          <p className="text-orange-100 font-lora mb-6 max-w-3xl mx-auto">
            In a democratic society, the right to financial privacy is not about hiding wrongdoing—
            it's about preserving the fundamental freedom to transact without pervasive surveillance.
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors duration-200">
            Learn About Privacy Rights
          </button>
        </div>
      </div>
    </section>
  );
};

export default Privacy;