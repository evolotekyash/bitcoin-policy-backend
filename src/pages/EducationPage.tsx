import Education from '../components/Education';
import PageHeader from '../components/PageHeader';

const EducationPage = () => {
  return (
    <div>
      <PageHeader 
        title="Bitcoin Education"
        description="Educational resources and programs to promote Bitcoin literacy and understanding. Empowering Indians with knowledge about Bitcoin technology, economics, and its potential for financial sovereignty."
        backgroundClass="bg-gradient-to-br from-blue-50 to-white"
      />
      <Education />
    </div>
  );
};

export default EducationPage;
