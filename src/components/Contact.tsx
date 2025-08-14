import React, { useState } from 'react';
import { Mail, Send, Bell } from 'lucide-react';
import { apiService } from '../services/apiService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Use the API service to save the submission to MongoDB
      const submission = await apiService.saveContactSubmission(formData);
      
      // Show success status
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        organization: '',
        message: ''
      });
      
      console.log('Form submitted:', submission);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error saving form submission:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewsletterSubmitting(true);
    setNewsletterStatus('idle');
    
    try {
      // Use the API service to save the newsletter signup to MongoDB
      const signup = await apiService.saveNewsletterSignup(newsletterEmail);
      
      // Show success status
      setNewsletterStatus('success');
      
      // Reset form
      setNewsletterEmail('');
      
      console.log('Newsletter signup:', signup);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setNewsletterStatus('idle'), 5000);
    } catch (error) {
      console.error('Error saving newsletter signup:', error);
      setNewsletterStatus('error');
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                  <Mail className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-inter">
                  Send us a Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Organization
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Your organization or company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 resize-none"
                    placeholder="Tell us about your inquiry, collaboration ideas, or questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full inline-flex items-center justify-center px-8 py-4 font-bold rounded-xl transform transition-all duration-200 shadow-lg hover:shadow-xl ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:scale-[1.02]'
                  }`}
                >
                  <Send className="mr-3 h-5 w-5" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-green-800 text-sm font-medium">
                      ✅ Message sent successfully! We'll get back to you soon.
                    </p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-800 text-sm font-medium">
                      ❌ There was an error sending your message. Please try again.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Social Media Connect */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-inter">
                  Follow Us
                </h3>
              </div>
              
              <p className="text-gray-600 font-lora mb-6 text-sm leading-relaxed">
                Stay connected for real-time policy updates and Bitcoin discussions.
              </p>

              <div className="space-y-4">
                <a
                  href="https://x.com/bitcoinpolicyin" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 border-2 border-gray-100 rounded-xl hover:border-orange-200 hover:bg-orange-25 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">X (Twitter)</p>
                    <p className="text-sm text-gray-500">@bitcoinpolicyin</p>
                  </div>
                </a>

                <a
                  href="mailto:contact@bitcoinpolicy.in"
                  className="flex items-center space-x-4 p-4 border-2 border-gray-100 rounded-xl hover:border-orange-200 hover:bg-orange-25 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">Email</p>
                    <p className="text-sm text-gray-500">contact@bitcoinpolicy.in</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold font-inter">
                  Newsletter
                </h3>
              </div>
              
              <p className="text-slate-300 font-lora mb-6 text-sm leading-relaxed">
                Get the latest policy updates, research reports, and Bitcoin developments in India.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  required
                />
                <button
                  type="submit"
                  disabled={isNewsletterSubmitting}
                  className={`w-full px-6 py-3 font-bold rounded-xl transition-all duration-200 transform hover:scale-[1.02] ${
                    isNewsletterSubmitting
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-white text-slate-900 hover:bg-gray-100'
                  }`}
                >
                  {isNewsletterSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>

                {/* Newsletter Status Messages */}
                {newsletterStatus === 'success' && (
                  <div className="mt-3 p-3 bg-green-900/20 border border-green-700 rounded-lg">
                    <p className="text-green-200 text-sm font-medium">
                      ✅ Successfully subscribed to newsletter!
                    </p>
                  </div>
                )}
                
                {newsletterStatus === 'error' && (
                  <div className="mt-3 p-3 bg-red-900/20 border border-red-700 rounded-lg">
                    <p className="text-red-200 text-sm font-medium">
                      ❌ Subscription failed. Email may already be subscribed.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;