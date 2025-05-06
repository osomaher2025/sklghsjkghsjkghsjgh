
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  position: string;
  department: string;
  location: string;
  phone?: string;
}

export interface JobPost {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary' | 'Internship';
  experience: string;
  postedDate: string;
  closingDate: string;
  status: 'Active' | 'Closed' | 'Draft';
  applicants: number;
}

export type SortDirection = 'asc' | 'desc';

export interface SortState {
  column: string;
  direction: SortDirection;
}

export type FilterState = {
  status: string[];
  type: string[];
  department: string[];
  search: string;
};
