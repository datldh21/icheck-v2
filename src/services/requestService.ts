import type { LeaveRequest, RequestType, DurationType } from '../types';
import { mockRequests } from '../mocks';

let requests = [...mockRequests];

export const requestService = {
  async getMyRequests(userId: string): Promise<LeaveRequest[]> {
    return Promise.resolve(requests.filter((r) => r.userId === userId));
  },

  async getAllRequests(): Promise<LeaveRequest[]> {
    return Promise.resolve([...requests]);
  },

  async getPendingRequests(): Promise<LeaveRequest[]> {
    return Promise.resolve(requests.filter((r) => r.status === 'pending'));
  },

  async createRequest(data: {
    userId: string;
    userName: string;
    type: RequestType;
    startDate: string;
    endDate: string;
    duration: DurationType;
    reason: string;
    customStartTime?: string;
    customEndTime?: string;
  }): Promise<LeaveRequest> {
    const newRequest: LeaveRequest = {
      id: `r-${Date.now()}`,
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    requests = [newRequest, ...requests];
    return Promise.resolve(newRequest);
  },

  async approveRequest(requestId: string, approverId: string, approverName: string): Promise<LeaveRequest> {
    const idx = requests.findIndex((r) => r.id === requestId);
    if (idx === -1) throw new Error('Request not found');
    requests[idx] = { ...requests[idx], status: 'approved', approverId, approverName };
    return Promise.resolve(requests[idx]);
  },

  async rejectRequest(requestId: string, approverId: string, approverName: string, rejectReason?: string): Promise<LeaveRequest> {
    const idx = requests.findIndex((r) => r.id === requestId);
    if (idx === -1) throw new Error('Request not found');
    requests[idx] = { ...requests[idx], status: 'rejected', approverId, approverName, rejectReason };
    return Promise.resolve(requests[idx]);
  },
};
