export interface CreateChatSessionRequest {
  title: string;
}

export interface CreateChatSessionResponse {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
  chat_history?: ChatHistorySchema[];
}

export interface ListChatSessionsResponse {
  [index: number]: ChatSessionSchema;
}

export interface GetChatHistoryResponse {
  [index: number]: ChatHistorySchema;
}

export interface ChatSessionSchema {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
  chat_history?: ChatHistorySchema[];
}

export interface ChatHistorySchema {
  id: number;
  chat_id: string;
  query: string;
  response: string;
  created_at: string;
}
