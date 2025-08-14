import Contact from '../components/Contact';
import PageHeader from '../components/PageHeader';

const ContactPage = () => {
  return (
    <div>
      <PageHeader 
        title="Contact Us"
        description="Get in touch with the Bitcoin Policy Institute India team. We're here to collaborate on advancing Bitcoin adoption and policy development in India."
        backgroundClass="bg-gradient-to-br from-purple-50 to-white"
      />
      <Contact />
    </div>
  );
};

export default ContactPage;
