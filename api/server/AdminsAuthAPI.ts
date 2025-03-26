import got from 'got';

import { LoginReq } from '@/types';
import ServerServiceAPI from './ServerServiceAPI';

interface LoginRes {
  token: string;
  status: string;
}

export default class AdminsAuthAPI extends ServerServiceAPI {

  static AUTH_API_GOT = got.extend(super.SERVICE_GOT, {
    prefixUrl: `${this._SERVICE_API_ADDRESS}/admin/auth`,
  });

  static postLogin = async (credentials: LoginReq): Promise<LoginRes> => {
    return await this.AUTH_API_GOT.post<LoginRes>(`v1/login`, { json: credentials }).json();;
  }
}