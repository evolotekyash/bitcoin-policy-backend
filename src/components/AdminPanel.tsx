import { useState, useEffect } from 'react';
import { apiService, ContactSubmission, NewsletterSignup } from '../services/apiService';
import { Download, Trash2, Mail, Users, Calendar, Wifi, WifiOff } from 'lucide-react';

const AdminPanel = () => {
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [newsletterSignups, setNewsletterSignups] = useState<NewsletterSignup[]>([]);
  const [activeTab, setActiveTab] = useState<'contacts' | 'newsletters'>('contacts');
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    loadData();
    checkServerHealth();
  }, []);

  const checkServerHealth = async () => {
    const health = await apiService.healthCheck();
    setIsOnline(health);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [contacts, newsletters] = await Promise.all([
        apiService.getContactSubmissions(),
        apiService.getNewsletterSignups()
      ]);
      setContactSubmissions(contacts);
      setNewsletterSignups(newsletters);
      setIsOnline(true);
    } catch (error) {
      console.error('Error loading data:', error);
      setIsOnline(false);
    } finally {
      setIsLoading(false);
    }
  };

  const exportContacts = () => {
    apiService.exportContactSubmissions(contactSubmissions);
  };

  const exportNewsletters = () => {
    apiService.exportNewsletterSignups(newsletterSignups);
  };

  const clearContacts = async () => {
    if (window.confirm('Are you sure you want to clear all contact submissions? This cannot be undone.')) {
      try {
        await apiService.clearContactSubmissions();
        await loadData();
      } catch (error) {
        console.error('Error clearing contacts:', error);
        alert('Failed to clear contact submissions');
      }
    }
  };

  const clearNewsletters = async () => {
    if (window.confirm('Are you sure you want to clear all newsletter signups? This cannot be undone.')) {
      try {
        await apiService.clearNewsletterSignups();
        await loadData();
      } catch (error) {
        console.error('Error clearing newsletters:', error);
        alert('Failed to clear newsletter signups');
      }
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Form Data Admin Panel</h1>
                <p className="text-gray-600 mt-2">Manage contact submissions and newsletter signups</p>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href="/admin/policy-signups"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Policy Signups (Unified)
                </a>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                  isOnline 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {isOnline ? (
                    <>
                      <Wifi className="w-4 h-4" />
                      <span>MongoDB Connected</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-4 h-4" />
                      <span>MongoDB Disconnected</span>
                    </>
                  )}
                </div>
                <button
                  onClick={loadData}
                  disabled={isLoading}
                  className={`px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Loading...' : 'Refresh'}
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('contacts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'contacts'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Mail className="inline-block w-4 h-4 mr-2" />
                Contact Submissions ({contactSubmissions.length})
              </button>
              <button
                onClick={() => setActiveTab('newsletters')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'newsletters'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="inline-block w-4 h-4 mr-2" />
                Newsletter Signups ({newsletterSignups.length})
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'contacts' ? (
              <div>
                {/* Actions */}
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={exportContacts}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export JSON
                  </button>
                  <button
                    onClick={clearContacts}
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </button>
                </div>

                {/* Contact Submissions */}
                {contactSubmissions.length === 0 ? (
                  <div className="text-center py-12">
                    <Mail className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No contact submissions</h3>
                    <p className="mt-1 text-sm text-gray-500">No one has submitted the contact form yet.</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {contactSubmissions.map((submission) => (
                      <div key={submission._id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-3">
                              <h3 className="text-lg font-semibold text-gray-900">{submission.name}</h3>
                              <span className="text-sm text-gray-500">{submission.email}</span>
                            </div>
                            {submission.organization && (
                              <p className="text-sm text-gray-600 mb-2">Organization: {submission.organization}</p>
                            )}
                            <p className="text-gray-700 mb-3">{submission.message}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(submission.createdAt!)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {/* Actions */}
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={exportNewsletters}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export JSON
                  </button>
                  <button
                    onClick={clearNewsletters}
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </button>
                </div>

                {/* Newsletter Signups */}
                {newsletterSignups.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No newsletter signups</h3>
                    <p className="mt-1 text-sm text-gray-500">No one has signed up for the newsletter yet.</p>
                  </div>
                ) : (
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {newsletterSignups.map((signup) => (
                        <li key={signup._id} className="px-6 py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Mail className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                              <p className="text-sm font-medium text-gray-900">{signup.email}</p>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(signup.createdAt!)}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
