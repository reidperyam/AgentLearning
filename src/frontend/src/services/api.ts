import type { ChatMessage, CreateMessageRequest, HealthResponse } from '../types/chat';

const API_BASE_URL = '/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new ApiError(response.status, `API request failed: ${response.statusText}`);
  }

  // Handle 204 No Content responses
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const api = {
  async healthCheck(): Promise<HealthResponse> {
    return fetchApi<HealthResponse>('/health');
  },

  async getMessages(): Promise<ChatMessage[]> {
    return fetchApi<ChatMessage[]>('/messages');
  },

  async sendMessage(request: CreateMessageRequest): Promise<ChatMessage> {
    return fetchApi<ChatMessage>('/messages', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  async clearMessages(): Promise<void> {
    await fetchApi<void>('/messages', {
      method: 'DELETE',
    });
  },
};
