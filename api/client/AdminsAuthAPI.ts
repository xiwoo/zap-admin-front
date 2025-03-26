import ky, { HTTPError } from 'ky';

import { LoginReq, LoginResp } from '@/types';
import ClientServiceAPI from './ClientServiceAPI';


interface PasswordFormReq {
  prevPassword: string;
  nextPassword: string;
}

/**
 * 
 * /admin/auth client 호출 시 적용
 * 
 */
export default class AdminsAuthAPI extends ClientServiceAPI {

  static AUTH_API_KY = super.SERVICE_KY.extend(options => ({ 
    ...options, 
    prefixUrl: `${options.prefixUrl}/admin/auth` 
  }));

  static postLogin = async (credentials: LoginReq): Promise<LoginResp> => {

    // front server 호출
    const response = await ky.post<string>(
      `/login/api`, { credentials: 'include', json: credentials },
    );

    return await super.handleResponse<LoginResp>(response);
  }

  // TODO: 리턴처리 제대로
  static postChangePassword = async (passwordForm: PasswordFormReq) => {

    try {
      const response = await this.AUTH_API_KY.post<string>(
        `v1/change/password`, { json: passwordForm },
      );
      
      return {
        loginStatus: await super.handleResponse<string>(response),
        error: null
      }
    }
    catch(error) {
      //TODO: 이전 비번 틀렸을 때 처리 추가
    }
  }

}
