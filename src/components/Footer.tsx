import { Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Mission */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <Link 
                to="/" 
                className="flex items-center group transition-all duration-300"
              >
                <div className="relative">
                  <img 
                    src="/bpi.jpeg" 
                    alt="Bitcoin Policy Institute India" 
                    className="h-16 w-24 object-cover rounded-2xl shadow-lg border-2 border-orange-100 bg-white ring-2 ring-white/50"
                  />
                </div>
              </Link>
            </div>
            <p className="text-gray-300 font-lora leading-relaxed max-w-md">
              Advancing Bitcoin adoption in India through research, education, and policy advocacy. 
              Building the foundation for India's digital financial sovereignty.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold font-inter mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/mining" className="text-gray-300 hover:text-orange-400 transition-colors">Mining Plan</Link></li>
              <li><Link to="/policy" className="text-gray-300 hover:text-orange-400 transition-colors">Policy Library</Link></li>
              <li><Link to="/reserve" className="text-gray-300 hover:text-orange-400 transition-colors">Strategic Reserve</Link></li>
              <li><Link to="/education" className="text-gray-300 hover:text-orange-400 transition-colors">Education</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-orange-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold font-inter mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300 text-sm">contact@bitcoinpolicy.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300 text-sm">New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Bitcoin Policy Institute India. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">Privacy Policy</Link>
              <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;