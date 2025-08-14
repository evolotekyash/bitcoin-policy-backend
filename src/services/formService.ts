export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  organization: string;
  message: string;
  timestamp: string;
}

export interface NewsletterSignup {
  id: number;
  email: string;
  timestamp: string;
}

class FormService {
  // Contact form methods
  saveContactSubmission(formData: Omit<ContactSubmission, 'id' | 'timestamp'>): ContactSubmission {
    const submissions = this.getContactSubmissions();
    const newSubmission: ContactSubmission = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };
    
    submissions.push(newSubmission);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    
    return newSubmission;
  }

  getContactSubmissions(): ContactSubmission[] {
    const stored = localStorage.getItem('contactSubmissions');
    return stored ? JSON.parse(stored) : [];
  }

  // Newsletter methods
  saveNewsletterSignup(email: string): NewsletterSignup {
    const signups = this.getNewsletterSignups();
    
    // Check if email already exists
    const existingSignup = signups.find(signup => signup.email === email);
    if (existingSignup) {
      throw new Error('Email already subscribed to newsletter');
    }
    
    const newSignup: NewsletterSignup = {
      id: Date.now(),
      email,
      timestamp: new Date().toISOString(),
    };
    
    signups.push(newSignup);
    localStorage.setItem('newsletterSignups', JSON.stringify(signups));
    
    return newSignup;
  }

  getNewsletterSignups(): NewsletterSignup[] {
    const stored = localStorage.getItem('newsletterSignups');
    return stored ? JSON.parse(stored) : [];
  }

  // Export data methods
  exportContactSubmissions(): string {
    const submissions = this.getContactSubmissions();
    return JSON.stringify(submissions, null, 2);
  }

  exportNewsletterSignups(): string {
    const signups = this.getNewsletterSignups();
    return JSON.stringify(signups, null, 2);
  }

  // Clear data methods
  clearContactSubmissions(): void {
    localStorage.removeItem('contactSubmissions');
  }

  clearNewsletterSignups(): void {
    localStorage.removeItem('newsletterSignups');
  }
}

export const formService = new FormService();
