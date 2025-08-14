import TopicCard from './TopicCard';
import topics from '../data/topics';

const PolicyLibrary = () => {
  return (
    <section id="policy" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Policy Documents Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {topics.map((topic, index) => (
            <TopicCard key={index} topic={topic} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PolicyLibrary;