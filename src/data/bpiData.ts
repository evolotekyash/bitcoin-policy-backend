// Bitcoin Policy Initiative Data Structure
// Based on the Unified Doc BPI document

export interface RegionalData {
  id: string;
  name: string;
  type: 'hydropower' | 'solar' | 'wind' | 'thermal';
  location: string;
  capacity: string;
  potential: string;
  annualOutput: string;
  challenges: string[];
  opportunities: string[];
  economicImpact: string;
  technicalDetails: {
    averageGeneration: string;
    peakCapacity: string;
    curtailmentRate: string;
    gridConnection: string;
  };
}

export interface PolicyBrief {
  id: string;
  title: string;
  description: string;
  pages: number;
  category: 'regulation' | 'economic' | 'technical' | 'strategic';
  keyFindings: string[];
  recommendations: string[];
  downloadUrl?: string;
}

export interface GlobalPrecedent {
  country: string;
  description: string;
  implementation: string;
  results: string;
  lessons: string[];
  applicabilityToIndia: string;
}

export interface EducationProgram {
  id: string;
  title: string;
  description: string;
  targetAudience: string[];
  duration: string;
  modules: string[];
  outcomes: string[];
  partnerships: string[];
}

export interface EconomicProjection {
  timeframe: string;
  btcProduction: number;
  valueInCrores: number;
  energyUtilized: string;
  jobsCreated: number;
  regions: string[];
}

// Regional Mining Data
export const regionalMiningData: RegionalData[] = [
  {
    id: 'himalayan-hydropower',
    name: 'Himalayan Hydropower Corridor',
    type: 'hydropower',
    location: 'Himachal Pradesh, Uttarakhand, Arunachal Pradesh',
    capacity: '15,000-20,000 MW untapped potential',
    potential: '120,000-150,000 BTC annually',
    annualOutput: '₹120,000-150,000 crore potential value',
    challenges: [
      'Seasonal variation in water flow',
      'Remote infrastructure requirements',
      'Environmental clearances',
      'Grid connectivity in mountainous terrain'
    ],
    opportunities: [
      'Abundant year-round water flow',
      'Government push for renewable energy',
      'Strategic border development',
      'Local employment generation'
    ],
    economicImpact: 'Could generate ₹15,000 crore annually while developing border infrastructure',
    technicalDetails: {
      averageGeneration: '12-15 TWh annually',
      peakCapacity: '20,000 MW',
      curtailmentRate: '15-25% during monsoon',
      gridConnection: 'Requires 400kV transmission upgrades'
    }
  },
  {
    id: 'rajasthan-solar-belt',
    name: 'Rajasthan Solar Belt',
    type: 'solar',
    location: 'Rajasthan, Gujarat',
    capacity: '50,000 MW installed, 30% curtailment',
    potential: '45,000-60,000 BTC annually',
    annualOutput: '₹45,000-60,000 crore potential value',
    challenges: [
      'Duck curve - midday oversupply',
      'Grid instability during peak generation',
      'Dust accumulation on panels',
      'Transmission bottlenecks'
    ],
    opportunities: [
      'Highest solar irradiation in country',
      'Established solar infrastructure',
      'Government support for solar expansion',
      'Land availability'
    ],
    economicImpact: 'Converts 15 TWh of curtailed solar into ₹6,000 crore annually',
    technicalDetails: {
      averageGeneration: '80-100 TWh annually',
      peakCapacity: '50,000 MW',
      curtailmentRate: '20-30% midday hours',
      gridConnection: 'Green corridors under development'
    }
  },
  {
    id: 'tamil-nadu-wind',
    name: 'Tamil Nadu Wind Zones',
    type: 'wind',
    location: 'Tamil Nadu, Karnataka, Andhra Pradesh',
    capacity: '25,000 MW installed capacity',
    potential: '30,000-40,000 BTC annually',
    annualOutput: '₹30,000-40,000 crore potential value',
    challenges: [
      'Intermittent wind patterns',
      'Night-time oversupply',
      'Grid balancing issues',
      'Monsoon impact on generation'
    ],
    opportunities: [
      'Consistent wind patterns during specific seasons',
      'Established wind industry',
      'Coastal areas with high wind speeds',
      'Technology improvements in turbines'
    ],
    economicImpact: 'Stabilizes revenue for wind farms while generating ₹4,000 crore annually',
    technicalDetails: {
      averageGeneration: '45-55 TWh annually',
      peakCapacity: '25,000 MW',
      curtailmentRate: '10-20% night hours',
      gridConnection: 'Strengthening inter-state connections'
    }
  },
  {
    id: 'eastern-thermal',
    name: 'Eastern Thermal Grid-Curtailed Power',
    type: 'thermal',
    location: 'Odisha, Chhattisgarh, Jharkhand',
    capacity: '40,000 MW thermal capacity',
    potential: '25,000-35,000 BTC annually',
    annualOutput: '₹25,000-35,000 crore potential value',
    challenges: [
      'Coal quality variations',
      'Environmental concerns',
      'Legacy infrastructure',
      'Labor transition needs'
    ],
    opportunities: [
      'Abundant coal reserves',
      'Existing power infrastructure',
      'Industrial demand proximity',
      'Job creation in mining regions'
    ],
    economicImpact: 'Monetizes 8-12 TWh excess capacity generating ₹3,500 crore annually',
    technicalDetails: {
      averageGeneration: '150-180 TWh annually',
      peakCapacity: '40,000 MW',
      curtailmentRate: '5-15% off-peak hours',
      gridConnection: 'Robust transmission network'
    }
  }
];

// Policy Research Briefs
export const policyBriefs: PolicyBrief[] = [
  {
    id: 'regulatory-framework',
    title: 'Bitcoin Mining Regulatory Framework for India',
    description: 'Comprehensive analysis of regulatory requirements for institutional Bitcoin mining operations',
    pages: 45,
    category: 'regulation',
    keyFindings: [
      'Current regulatory ambiguity creates barriers to institutional adoption',
      'Clear guidelines needed for energy trading and mining operations',
      'Tax framework requires clarity on mining rewards vs trading',
      'Environmental compliance standards need Bitcoin-specific guidelines'
    ],
    recommendations: [
      'Establish Bitcoin mining under renewable energy category',
      'Create special economic zones for mining operations',
      'Develop clear taxation guidelines for mining activities',
      'Integrate with existing energy trading mechanisms'
    ]
  },
  {
    id: 'economic-impact-study',
    title: 'Economic Impact of National Bitcoin Mining Strategy',
    description: 'Detailed economic modeling of Bitcoin mining impact on Indian economy',
    pages: 38,
    category: 'economic',
    keyFindings: [
      'Potential to generate ₹150,000+ crore annually',
      'Create 2-3 lakh direct and indirect jobs',
      'Reduce energy waste by 25-30 TWh annually',
      'Strengthen balance of payments through Bitcoin reserves'
    ],
    recommendations: [
      'Phase implementation starting with 1000 MW pilot projects',
      'Establish sovereign Bitcoin reserve fund',
      'Create mining operator licensing framework',
      'Develop indigenous mining hardware manufacturing'
    ]
  },
  {
    id: 'technical-implementation',
    title: 'Technical Implementation Blueprint',
    description: 'Engineering and technical requirements for large-scale mining deployment',
    pages: 52,
    category: 'technical',
    keyFindings: [
      'Grid integration requires smart contract mechanisms',
      'Modular mining units enable rapid deployment',
      'Heat recovery can improve overall efficiency by 15-20%',
      'Indigenous hardware development critical for security'
    ],
    recommendations: [
      'Develop standardized mining container specifications',
      'Create grid-responsive mining protocols',
      'Establish mining equipment testing and certification',
      'Build strategic hardware reserves'
    ]
  },
  {
    id: 'strategic-reserve-model',
    title: 'Strategic Bitcoin Reserve Implementation Model',
    description: 'Framework for building and managing national Bitcoin reserves through mining',
    pages: 41,
    category: 'strategic',
    keyFindings: [
      'Mining-based reserves reduce foreign exchange exposure',
      'Self-custody model ensures sovereign control',
      'Diversified reserve portfolio improves monetary stability',
      'Bitcoin provides hedge against traditional reserve risks'
    ],
    recommendations: [
      'Target 1% of forex reserves in Bitcoin by 2030',
      'Establish multi-signature custody protocols',
      'Create transparent reserve management framework',
      'Develop Bitcoin reserve investment guidelines'
    ]
  }
];

// Global Mining Precedents
export const globalPrecedents: GlobalPrecedent[] = [
  {
    country: 'Bhutan',
    description: 'Hydropower-based Bitcoin mining for national revenue',
    implementation: 'Government-led mining operations using excess hydropower capacity',
    results: 'Generated $500M+ in Bitcoin reserves, funded development projects',
    lessons: [
      'Small scale allows rapid implementation',
      'Hydropower provides cheap, clean energy',
      'Government custody ensures sovereign control',
      'Mining profits fund public infrastructure'
    ],
    applicabilityToIndia: 'Similar hydropower potential in Himalayan states, scalable model'
  },
  {
    country: 'Texas, USA',
    description: 'Grid-responsive mining for stability',
    implementation: 'Mining operations that reduce load during peak demand',
    results: 'Improved grid stability, reduced electricity costs for consumers',
    lessons: [
      'Mining can improve grid economics',
      'Demand response programs create value',
      'Public-private partnerships effective',
      'Regulatory clarity enables investment'
    ],
    applicabilityToIndia: 'Applicable to renewable curtailment management and grid balancing'
  },
  {
    country: 'El Salvador',
    description: 'Volcano-powered mining builds reserves',
    implementation: 'Geothermal energy for mining and reserve accumulation',
    results: 'Accumulated significant Bitcoin treasury, reduced energy waste',
    lessons: [
      'Renewable energy ideal for mining',
      'Strategic reserve building possible',
      'Public awareness campaigns important',
      'Gradual implementation reduces risks'
    ],
    applicabilityToIndia: 'Model for renewable energy utilization and reserve building'
  },
  {
    country: 'Norway',
    description: 'Hydropower mining with environmental focus',
    implementation: 'Sustainable mining using abundant hydroelectric power',
    results: 'Profitable operations with minimal environmental impact',
    lessons: [
      'Hydropower provides sustainable mining base',
      'Cold climate reduces cooling costs',
      'Environmental sustainability attracts investment',
      'Long-term energy contracts ensure profitability'
    ],
    applicabilityToIndia: 'Relevant for Himalayan hydropower regions'
  }
];

// Education and Training Programs
export const educationPrograms: EducationProgram[] = [
  {
    id: 'technical-training',
    title: 'Bitcoin Protocol Engineering Program',
    description: 'Advanced technical training for Bitcoin protocol development and mining operations',
    targetAudience: ['Software Engineers', 'Electrical Engineers', 'Mining Technicians'],
    duration: '6 months intensive program',
    modules: [
      'Bitcoin Protocol Fundamentals',
      'Mining Hardware and Software',
      'Grid Integration Technologies',
      'Security and Custody Solutions',
      'Performance Optimization',
      'Regulatory Compliance'
    ],
    outcomes: [
      'Certified Bitcoin Mining Engineers',
      'Protocol development capabilities',
      'Grid integration expertise',
      'Security-first mindset'
    ],
    partnerships: ['Bitshala', 'IITs', 'Indian Energy Sector Companies']
  },
  {
    id: 'policy-workshops',
    title: 'Bitcoin Policy and Economics Workshops',
    description: 'Educational sessions for policymakers and government officials',
    targetAudience: ['Government Officials', 'Policy Makers', 'Regulators', 'Central Bank Officials'],
    duration: '2-week intensive workshops',
    modules: [
      'Bitcoin Economics and Monetary Theory',
      'Regulatory Framework Development',
      'Energy Grid Integration',
      'National Security Considerations',
      'International Best Practices',
      'Implementation Strategies'
    ],
    outcomes: [
      'Informed policy decisions',
      'Regulatory clarity',
      'Strategic implementation plans',
      'International cooperation frameworks'
    ],
    partnerships: ['Ministry of Power', 'RBI', 'NITI Aayog', 'Ministry of Electronics and IT']
  },
  {
    id: 'research-programs',
    title: 'Bitcoin Technology Research Initiative',
    description: 'Academic partnerships for Bitcoin technology and protocol research',
    targetAudience: ['Researchers', 'PhD Students', 'Faculty', 'Industry Experts'],
    duration: 'Ongoing research programs',
    modules: [
      'Bitcoin Protocol Research',
      'Energy Grid Optimization',
      'Cryptography and Security',
      'Economic Modeling',
      'Policy Research',
      'Innovation Labs'
    ],
    outcomes: [
      'Research publications',
      'Patent applications',
      'Innovation in mining technology',
      'Policy recommendations'
    ],
    partnerships: ['IISc', 'IITs', 'Indian Statistical Institute', 'International Universities']
  }
];

// Economic Projections
export const economicProjections: EconomicProjection[] = [
  {
    timeframe: '2025-2026 (Year 1)',
    btcProduction: 15000,
    valueInCrores: 15000,
    energyUtilized: '3-4 TWh pilot projects',
    jobsCreated: 25000,
    regions: ['Himachal Pradesh', 'Rajasthan']
  },
  {
    timeframe: '2026-2028 (Years 2-3)',
    btcProduction: 60000,
    valueInCrores: 60000,
    energyUtilized: '12-15 TWh across regions',
    jobsCreated: 75000,
    regions: ['Himachal Pradesh', 'Rajasthan', 'Tamil Nadu', 'Karnataka']
  },
  {
    timeframe: '2028-2030 (Years 4-5)',
    btcProduction: 150000,
    valueInCrores: 150000,
    energyUtilized: '25-30 TWh nationwide',
    jobsCreated: 200000,
    regions: ['All major renewable energy states', 'Eastern thermal regions']
  }
];

// Statistics for Hero and Stat Bar
export const keyStatistics = {
  energyWasted: '25-30 TWh/year',
  btcPotential: '150,000 BTC/year',
  annualValue: '₹150,000+ crore/year',
  jobCreation: '2-3 lakh jobs',
  forexSavings: '₹50,000+ crore',
  carbonReduction: '15-20 million tons CO2'
};

// Contact and Partnerships
export const partnerships = [
  'Bitshala',
  'Indian Institute of Technology (Multiple Campuses)',
  'Indian Institute of Science',
  'Ministry of Power',
  'Central Electricity Authority',
  'NITI Aayog',
  'Reserve Bank of India (Consultative)',
  'International Bitcoin Mining Companies',
  'Renewable Energy Developers'
];

export const contactInformation = {
  email: 'contact@bitcoinpolicyindia.org',
  phone: '+91-XX-XXXX-XXXX',
  address: 'Bitcoin Policy Initiative India',
  socialMedia: {
    twitter: '@BitcoinPolicyIN',
    linkedin: 'bitcoin-policy-initiative-india',
    github: 'bitcoin-policy-india'
  }
};
