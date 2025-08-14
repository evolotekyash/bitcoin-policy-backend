import Privacy from '../components/Privacy';
import PageHeader from '../components/PageHeader';

const PrivacyPage = () => {
  return (
    <div>
      <PageHeader 
        title="Privacy Policy"
        description="Our commitment to protecting your privacy and data security. Transparency in how we collect, use, and protect your information while advancing Bitcoin education and policy."
        backgroundClass="bg-gradient-to-br from-gray-50 to-white"
      />
      <Privacy />
    </div>
  );
};

export default PrivacyPage;
