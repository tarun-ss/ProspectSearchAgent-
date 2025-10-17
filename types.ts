
export interface Contact {
  name: string;
  title: string;
  email: string;
  linkedin: string;
}

export interface Signals {
  recent_hiring: boolean;
  new_funding: boolean;
}

export interface Prospect {
  company_name: string;
  domain: string;
  revenue: number;
  industry: string;
  funding_stage: string;
  contacts: Contact[];
  signals: Signals;
  source: string[];
  confidence: number;
}
