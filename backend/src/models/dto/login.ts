export interface LoginResponse {
  status: string;
  username?: string;
  authorization?: string;
  message?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
