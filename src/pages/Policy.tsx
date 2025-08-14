import PolicyLibrary from '../components/PolicyLibrary';
import PageHeader from '../components/PageHeader';

const Policy = () => {
  return (
    <div>
      <PageHeader 
        title="Policy Library"
        description="Comprehensive collection of Bitcoin policies, regulations, and guidelines. Advancing legal frameworks for Bitcoin adoption in India through research-driven policy recommendations."
      />
      <PolicyLibrary />
    </div>
  );
};

export default Policy;
