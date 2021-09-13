export interface RegistrationResponse {
  id: number;
  lastName: string;
  firstName: string;
  userName: string;
}

export interface RegistrationRequest {
  username: string;
  password: string;
}
