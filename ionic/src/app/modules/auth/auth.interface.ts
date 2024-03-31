import { BaseResponseData } from "@core/interfaces/base.interface";

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
  user: BaseResponseData;
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
