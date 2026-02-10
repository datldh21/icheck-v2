import { create } from 'zustand';
import type { LeaveRequest, RequestType, DurationType } from '../types';
import { requestService } from '../services';

interface RequestState {
  myRequests: LeaveRequest[];
  allRequests: LeaveRequest[];
  pendingRequests: LeaveRequest[];
  isLoading: boolean;
  fetchMyRequests: (userId: string) => Promise<void>;
  fetchAllRequests: () => Promise<void>;
  fetchPendingRequests: () => Promise<void>;
  createRequest: (data: {
    userId: string;
    userName: string;
    type: RequestType;
    startDate: string;
    endDate: string;
    duration: DurationType;
    reason: string;
    customStartTime?: string;
    customEndTime?: string;
  }) => Promise<void>;
  approveRequest: (requestId: string, approverId: string, approverName: string) => Promise<void>;
  rejectRequest: (requestId: string, approverId: string, approverName: string) => Promise<void>;
}

export const useRequestStore = create<RequestState>((set) => ({
  myRequests: [],
  allRequests: [],
  pendingRequests: [],
  isLoading: false,

  fetchMyRequests: async (userId: string) => {
    set({ isLoading: true });
    const requests = await requestService.getMyRequests(userId);
    set({ myRequests: requests, isLoading: false });
  },

  fetchAllRequests: async () => {
    set({ isLoading: true });
    const requests = await requestService.getAllRequests();
    set({ allRequests: requests, isLoading: false });
  },

  fetchPendingRequests: async () => {
    const requests = await requestService.getPendingRequests();
    set({ pendingRequests: requests });
  },

  createRequest: async (data) => {
    await requestService.createRequest(data);
    // Refresh
    const myReqs = await requestService.getMyRequests(data.userId);
    set({ myRequests: myReqs });
  },

  approveRequest: async (requestId, approverId, approverName) => {
    await requestService.approveRequest(requestId, approverId, approverName);
    const pending = await requestService.getPendingRequests();
    const all = await requestService.getAllRequests();
    set({ pendingRequests: pending, allRequests: all });
  },

  rejectRequest: async (requestId, approverId, approverName) => {
    await requestService.rejectRequest(requestId, approverId, approverName);
    const pending = await requestService.getPendingRequests();
    const all = await requestService.getAllRequests();
    set({ pendingRequests: pending, allRequests: all });
  },
}));
