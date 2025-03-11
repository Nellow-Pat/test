export interface ChatRequest {
  query: string;
  chat_id?: string;
}

export interface ChatResponse {
  response: string;
  chat_id? : string;
}
