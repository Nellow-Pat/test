export interface RegisterRequest {
  username: string;
  password: string;
  user_type: "individual" | "organization";
}

export interface RegisterResponse {
  username: string;
  user_type: string;
}

export interface RegisterAdminRequest {
  username: string;
  password: string;
}

export interface RegisterAdminResponse {
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}
