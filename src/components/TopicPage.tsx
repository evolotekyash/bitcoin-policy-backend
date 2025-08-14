import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Hash, ChevronRight } from 'lucide-react';
import { getTopicBySlug, type TopicSection } from '../data/topics';
import PageHeader from './PageHeader';

const TopicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeSection, setActiveSection] = useState<string>('');
  
  if (!slug) {
    return <div>Topic not found</div>;
  }

  const topic = getTopicBySlug(slug);
  
  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Topic Not Found</h1>
          <Link 
            to="/policy" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Policy Library
          </Link>
        </div>
      </div>
    );
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title={topic.title}
        description={topic.description}
        showLogo={false}
        backgroundClass="bg-gradient-to-br from-slate-50 to-white"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/policy" className="hover:text-orange-600 transition-colors">
            Policy Library
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{topic.title}</span>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 font-inter mb-4 flex items-center">
                  <Hash className="h-5 w-5 mr-2 text-orange-500" />
                  Table of Contents
                </h3>
                
                <div className="space-y-1">
                  {topic.sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center space-x-3 ${
                        activeSection === section.id
                          ? 'bg-orange-100 text-orange-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-orange-600'
                      }`}
                    >
                      <span className="text-base">{section.icon}</span>
                      <span className="font-medium">{section.heading}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-16">
              {topic.sections.map((section) => (
                <TopicSection 
                  key={section.id} 
                  section={section}
                  onInView={() => setActiveSection(section.id)}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex justify-start items-center">
                <Link
                  to="/policy"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Policy Library
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TopicSectionProps {
  section: TopicSection;
  onInView: () => void;
}

const TopicSection = ({ section, onInView }: TopicSectionProps) => {
  return (
    <section 
      id={section.id}
      className="scroll-mt-24"
      onMouseEnter={onInView}
    >
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center border border-orange-200">
            <span className="text-xl">{section.icon}</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 font-inter">
            {section.heading}
          </h2>
        </div>

        <div className="prose prose-lg max-w-none">
          {section.body.map((paragraph, index) => (
            <p key={index} className="text-gray-700 font-lora leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>

        {section.highlights && section.highlights.length > 0 && (
          <div className="mt-8 bg-gradient-to-br from-orange-50 to-orange-25 rounded-2xl p-6 border border-orange-100">
            <h4 className="text-lg font-bold text-gray-900 font-inter mb-4 flex items-center">
              <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">✓</span>
              </span>
              Key Highlights
            </h4>
            <ul className="space-y-3">
              {section.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopicPage;
