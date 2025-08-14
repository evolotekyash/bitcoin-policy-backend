import { GraduationCap, Users, Code, BookOpen } from 'lucide-react';
import { educationPrograms } from '../data/bpiData';

const Education = () => {
  const initiatives = educationPrograms.map(program => ({
    icon: program.id === 'technical-training' ? Code :
          program.id === 'policy-workshops' ? Users :
          program.id === 'research-programs' ? BookOpen : GraduationCap,
    title: program.title,
    description: program.description
  }));

  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {initiatives.map((initiative, index) => (
            <div
              key={index}
              className="text-center group p-8 rounded-2xl border-2 border-orange-100 bg-gradient-to-br from-white to-orange-25 hover:border-orange-300 hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl mb-6 group-hover:from-orange-200 group-hover:to-orange-100 group-hover:shadow-lg transition-all duration-300 border border-orange-200">
                <initiative.icon className="h-8 w-8 text-orange-500 group-hover:text-orange-600 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 font-inter group-hover:text-orange-600 transition-colors duration-300">
                {initiative.title}
              </h3>
              <p className="text-gray-600 font-lora leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {initiative.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-orange-50 to-orange-25 rounded-2xl p-8 text-center border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-inter">
            Join Our Educational Mission
          </h3>
          <p className="text-gray-600 font-lora mb-6 max-w-2xl mx-auto">
            Help build India's Bitcoin expertise through comprehensive education and training programs.
          </p>
          <a 
            href="https://bitshala.org/fellowship/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl border border-orange-400"
          >
            <GraduationCap className="mr-2 h-5 w-5" />
            Get Involved in Education
          </a>
        </div>
      </div>
    </section>
  );
};

export default Education;