import EconomicProjections from '../components/EconomicProjections';
import GlobalIntegration from '../components/GlobalIntegration';
import PageHeader from '../components/PageHeader';

const Analytics = () => {
  return (
    <div>
      <PageHeader 
        title="Economic Analytics"
        description="Economic projections and global integration analysis for Bitcoin adoption in India. Data-driven insights into Bitcoin's potential impact on India's economy and global financial integration."
        backgroundClass="bg-gradient-to-br from-green-50 to-white"
      />
      <EconomicProjections />
      <GlobalIntegration />
    </div>
  );
};

export default Analytics;
