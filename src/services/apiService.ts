const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

export interface ContactSubmission {
  _id?: string;
  name: string;
  email: string;
  organization: string;
  message: string;
  createdAt?: string;
}

export interface NewsletterSignup {
  _id?: string;
  email: string;
  createdAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Contact form methods
  async saveContactSubmission(formData: Omit<ContactSubmission, '_id' | 'createdAt'>): Promise<ContactSubmission> {
    const response = await this.makeRequest<ContactSubmission>('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to save contact submission');
    }

    return response.data;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    const response = await this.makeRequest<ContactSubmission[]>('/contact');
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch contact submissions');
    }

    return response.data;
  }

  async clearContactSubmissions(): Promise<void> {
    const response = await this.makeRequest('/contact', {
      method: 'DELETE',
    });

    if (!response.success) {
      throw new Error(response.message || 'Failed to clear contact submissions');
    }
  }

  // Newsletter methods
  async saveNewsletterSignup(email: string): Promise<NewsletterSignup> {
    const response = await this.makeRequest<NewsletterSignup>('/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to save newsletter signup');
    }

    return response.data;
  }

  async getNewsletterSignups(): Promise<NewsletterSignup[]> {
    const response = await this.makeRequest<NewsletterSignup[]>('/newsletter');
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch newsletter signups');
    }

    return response.data;
  }

  async clearNewsletterSignups(): Promise<void> {
    const response = await this.makeRequest('/newsletter', {
      method: 'DELETE',
    });

    if (!response.success) {
      throw new Error(response.message || 'Failed to clear newsletter signups');
    }
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.makeRequest('/health');
      return response.success;
    } catch {
      return false;
    }
  }

  // Export data methods (download as JSON)
  exportContactSubmissions(submissions: ContactSubmission[]): void {
    const dataStr = JSON.stringify(submissions, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  exportNewsletterSignups(signups: NewsletterSignup[]): void {
    const dataStr = JSON.stringify(signups, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-signups-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

export const apiService = new ApiService();
