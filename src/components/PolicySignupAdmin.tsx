import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { Download, Trash2, Mail, Users, Calendar, BarChart3, Filter, RefreshCw } from 'lucide-react';

interface PolicySignup {
  _id: string;
  email: string;
  type: 'contact' | 'newsletter';
  name?: string;
  organization?: string;
  message?: string;
  status: 'active' | 'unsubscribed' | 'bounced';
  createdAt: string;
  ipAddress?: string;
  userAgent?: string;
  source: string;
}

interface PolicyStats {
  byType: {
    contact?: { count: number; latest: string };
    newsletter?: { count: number; latest: string };
  };
  total: number;
  uniqueEmails: number;
  latestSignup: string;
}

const PolicySignupAdmin = () => {
  const [signups, setSignups] = useState<PolicySignup[]>([]);
  const [stats, setStats] = useState<PolicyStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'contact' | 'newsletter'>('all');
  const [searchEmail, setSearchEmail] = useState('');

  useEffect(() => {
    loadData();
    loadStats();
  }, [filter, searchEmail]);

  const loadData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.append('type', filter);
      if (searchEmail) params.append('email', searchEmail);
      
      const response = await fetch(`http://localhost:5000/api/policy-signups?${params}`);
      const result = await response.json();
      
      if (result.success) {
        setSignups(result.data);
      }
    } catch (error) {
      console.error('Error loading policy signups:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/policy-signups/stats');
      const result = await response.json();
      
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const clearData = async (type?: 'contact' | 'newsletter') => {
    const typeText = type ? ` ${type}` : '';
    if (!window.confirm(`Are you sure you want to clear all${typeText} policy signups? This cannot be undone.`)) {
      return;
    }

    try {
      const params = type ? `?type=${type}` : '';
      const response = await fetch(`http://localhost:5000/api/policy-signups${params}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      
      if (result.success) {
        await loadData();
        await loadStats();
        alert(`${result.deletedCount} policy signups deleted successfully`);
      }
    } catch (error) {
      console.error('Error clearing data:', error);
      alert('Failed to clear data');
    }
  };

  const exportData = () => {
    const filteredData = signups.filter(signup => {
      if (filter !== 'all' && signup.type !== filter) return false;
      if (searchEmail && !signup.email.toLowerCase().includes(searchEmail.toLowerCase())) return false;
      return true;
    });

    const dataStr = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `policy-signups-${filter}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const updateSignupStatus = async (id: string, status: 'active' | 'unsubscribed' | 'bounced') => {
    try {
      const response = await fetch(`http://localhost:5000/api/policy-signups/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      const result = await response.json();
      if (result.success) {
        await loadData();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Policy Signup Management</h1>
                <p className="text-gray-600 mt-2">Unified contact submissions and newsletter signups</p>
              </div>
              <button
                onClick={() => { loadData(); loadStats(); }}
                disabled={loading}
                className={`px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <RefreshCw className={`w-4 h-4 mr-2 inline ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>

          {/* Stats Dashboard */}
          {stats && (
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Statistics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Signups</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-green-600">{stats.uniqueEmails}</div>
                  <div className="text-sm text-gray-600">Unique Emails</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-orange-600">{stats.byType.contact?.count || 0}</div>
                  <div className="text-sm text-gray-600">Contact Submissions</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-purple-600">{stats.byType.newsletter?.count || 0}</div>
                  <div className="text-sm text-gray-600">Newsletter Signups</div>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as 'all' | 'contact' | 'newsletter')}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="contact">Contact Submissions</option>
                  <option value="newsletter">Newsletter Signups</option>
                </select>
                <input
                  type="text"
                  placeholder="Search by email..."
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-64"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={exportData}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button
                  onClick={() => clearData(filter === 'all' ? undefined : filter)}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear {filter === 'all' ? 'All' : filter}
                </button>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {signups.map((signup) => (
                  <tr key={signup._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        signup.type === 'contact' 
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {signup.type === 'contact' ? <Mail className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />}
                        {signup.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{signup.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{signup.name || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{signup.organization || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={signup.status}
                        onChange={(e) => updateSignupStatus(signup._id, e.target.value as any)}
                        className={`text-xs font-medium border-0 bg-transparent ${
                          signup.status === 'active' ? 'text-green-800' :
                          signup.status === 'unsubscribed' ? 'text-red-800' : 'text-yellow-800'
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="unsubscribed">Unsubscribed</option>
                        <option value="bounced">Bounced</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(signup.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {signup.message && (
                        <button
                          onClick={() => alert(signup.message)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View Message
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {signups.length === 0 && !loading && (
            <div className="text-center py-12">
              <Mail className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No policy signups found</h3>
              <p className="mt-1 text-sm text-gray-500">No signups match your current filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicySignupAdmin;
