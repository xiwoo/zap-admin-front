import got from 'got';
import ServiceAPI from '../serviceApi';

interface LoginReq {
  identify: string;
  password: string;
}

interface LoginResp {
  token: string;
  status: 'ACTIVE' | 'PASSWORD_RESET_REQUIRED' | 'PASSWORD_NEEDS_UPDATE';
  session?: {
    id: number,
    name: string,
    roleName: string,
    isSuper: Boolean,
    permissionList: { id: Long, name: String, }[],
  };
}

class AdminsAPI extends ServiceAPI {

  static async postLogin(credentials: LoginReq): LoginResp {
    const response = await got.post(`${super._SERVICE_API_ADDRESS}/admin/auth/v1/login`, {json: credentials});
    return this.handleResponse(response);
  }

  static async handleResponse(response: Response<string>): Promise<LoginResp> {
    if (!response.ok) {
      throw new Error('API 요청 실패');
    }
    
    return JSON.parse(response.body)
  }
}

export default AdminsAPI;