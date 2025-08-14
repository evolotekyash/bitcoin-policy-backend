import StrategicReserve from '../components/StrategicReserve';
import PageHeader from '../components/PageHeader';

const Reserve = () => {
  return (
    <div>
      <PageHeader 
        title="Strategic Bitcoin Reserve"
        description="India's strategic approach to Bitcoin reserves and national Bitcoin management. Building sovereign wealth through strategic Bitcoin accumulation and energy monetization."
        backgroundClass="bg-gradient-to-br from-orange-50 to-white"
      />
      <StrategicReserve />
    </div>
  );
};

export default Reserve;
