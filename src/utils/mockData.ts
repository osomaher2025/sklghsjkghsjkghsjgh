
import { JobPost } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const departments = [
  'Engineering',
  'Product',
  'Marketing',
  'Sales',
  'Customer Support',
  'HR',
  'Finance',
];

const locations = [
  'San Francisco',
  'New York',
  'London',
  'Berlin',
  'Singapore',
  'Remote',
];

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'];

const experienceLevels = [
  'Entry Level',
  'Mid Level',
  'Senior',
  'Lead',
  'Manager',
  'Director',
];

const statuses = ['Active', 'Closed', 'Draft'];

function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

export function generateMockJobPosts(count: number): JobPost[] {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
  const threeMonthsLater = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate());

  return Array.from({ length: count }, () => ({
    id: uuidv4(),
    title: `${randomFromArray(experienceLevels)} ${randomFromArray([
      'Software Engineer',
      'Product Manager',
      'Data Scientist',
      'UX Designer',
      'Marketing Specialist',
      'Sales Representative',
      'Customer Success Manager',
      'HR Specialist',
      'Finance Analyst',
    ])}`,
    department: randomFromArray(departments),
    location: randomFromArray(locations),
    type: randomFromArray(jobTypes) as JobPost['type'],
    experience: randomFromArray(experienceLevels),
    postedDate: randomDate(sixMonthsAgo, now),
    closingDate: randomDate(now, threeMonthsLater),
    status: randomFromArray(statuses) as JobPost['status'],
    applicants: Math.floor(Math.random() * 100),
  }));
}

function randomFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
