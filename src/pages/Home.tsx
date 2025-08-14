import PillarIcons from '../components/PillarIcons';
import PageHeader from '../components/PageHeader';
import HomeContent from '../components/HomeContent';


const Home = () => {
  return (
    <div>
      <PageHeader 
        title="Bitcoin Policy Institute India"
        description="Leading India's transition to a Bitcoin-powered future through strategic policy research, energy innovation, and sovereign wealth creation."
        backgroundClass="bg-gradient-to-br from-orange-50 via-white to-orange-50"
      />
      <HomeContent />
      <PillarIcons />
    </div>
  );
};

export default Home;
