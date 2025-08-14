import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Topic } from '../data/topics';

interface TopicCardProps {
  topic: Topic;
}

const TopicCard = ({ topic }: TopicCardProps) => {
  return (
    <div className="group bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center border border-orange-200">
              <span className="text-2xl">{topic.icon}</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 font-inter mb-2 group-hover:text-orange-600 transition-colors duration-200">
              {topic.title}
            </h3>
          </div>
        </div>
      </div>

      <p className="text-gray-600 font-lora leading-relaxed mb-6">
        {topic.description}
      </p>

      <div className="flex items-center justify-start">
        <Link
          to={`/topic/${topic.slug}`}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg group"
        >
          Read Full Document
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
};

export default TopicCard;
