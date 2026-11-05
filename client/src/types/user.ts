export interface User {
  id: string;
  email: string;
  name?: string;
  selected_organization_id?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

