export interface RegistrationResponse {
  id: number;
  lastname: string;
  firstname: string;
  username: string;
}

export interface RegistrationRequest {
  lastname: string;
  firstname: string;
  username: string;
  password: string;
}
