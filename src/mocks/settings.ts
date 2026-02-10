import type { Setting, Department } from '../types';

export const mockSettings: Setting[] = [
  { id: 's1', configKey: 'COMPANY_IP', configValue: '113.161.72.100' },
  { id: 's2', configKey: 'COMPANY_IP_2', configValue: '113.161.72.101' },
  { id: 's3', configKey: 'WORK_START_TIME', configValue: '08:30' },
  { id: 's4', configKey: 'WORK_END_TIME', configValue: '18:00' },
  { id: 's5', configKey: 'LATE_THRESHOLD_MINUTES', configValue: '0' },
];

export const mockDepartments: Department[] = [
  { id: 'd1', name: 'Engineering', managerId: 'u10' },
  { id: 'd2', name: 'Design', managerId: 'u10' },
  { id: 'd3', name: 'Marketing', managerId: 'u10' },
  { id: 'd4', name: 'HR', managerId: 'u11' },
];
