import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TopicPage from './components/TopicPage';
import AdminPanel from './components/AdminPanel';
import PolicySignupAdmin from './components/PolicySignupAdmin';
import {
  Home,
  Mining,
  Policy,
  Reserve,
  EducationPage,
  Analytics,
  ContactPage,
  PrivacyPage,
  NotFound
} from './pages';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
                <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mining" element={<Mining />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/topic/:slug" element={<TopicPage />} />
            <Route path="/reserve" element={<Reserve />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/policy-signups" element={<PolicySignupAdmin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;