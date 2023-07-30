import { UserResponseData } from '../../user/interfaces/user.interface';

interface AuthDataRequest {
  email?: string;
  password?: string;
  remember?: boolean;
}

interface AuthDataResponse {
  token: string;
  name: string;
  email: string;
}

interface AuthCheckResponse {
  success: string;
  data: AuthCheckData;
  message: string;
}

interface AuthCheckData {
  checkToken: boolean;
  user: UserResponseData;
}

interface AuthResponse {
  success: string;
  data: AuthDataResponse;
  message: string;
}



export {
  AuthDataRequest,
  AuthDataResponse,
  AuthResponse,
  AuthCheckResponse,
};
