export interface ChatMessage {
  id: string;
  username: string;
  content: string;
  timestamp: string;
}

export interface CreateMessageRequest {
  username: string;
  content: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
}
