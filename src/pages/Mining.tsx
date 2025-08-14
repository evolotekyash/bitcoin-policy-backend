import MiningSection from '../components/MiningSection';
import PageHeader from '../components/PageHeader';

const Mining = () => {
  return (
    <div>
      <PageHeader 
        title="Bitcoin Mining Plan"
        description="Converting India's 25-30 TWh of wasted energy into strategic Bitcoin reserves. From 20,000 MW of untapped Himalayan hydropower to 50,000 MW of solar curtailment, modular mining operations can generate ₹150,000+ crore while creating 2-3 lakh jobs."
      />
      <MiningSection />
    </div>
  );
};

export default Mining;
