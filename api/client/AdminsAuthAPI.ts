import { HTTPError } from 'ky';
import ClientServiceAPI from './ClientServiceAPI';

interface LoginReq {
  identify: string;
  password: string;
}

interface LoginResp {
  loginStatus: string;
  error?: {
    message: string;
  };
}

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
    
    try {

      const response = await this.AUTH_API_KY.post<string>(
        `v1/login`, { credentials: 'include', json: credentials },
      );
      
      return {
        loginStatus: await super.handleResponse<string>(response),
      }
    }
    catch ( error ) {

      console.log(error);
      
      let errorMessage = "서버 오류입니다. 관리자에 문의하세요";

      if ( error instanceof HTTPError ) {
        const serverMessage = await error.response.text()
        console.log(serverMessage);
        
        switch ( error.response.status ) {
          case 401: {
            errorMessage = "로그인 정보가 맞지 않습니다.";
            break;
          }
          case 403: {
            if( serverMessage === "Password Reset Required" ) {
              errorMessage = "비밀번호 초기화 대상 유저입니다. 관리자에 문의하세요."
            }
            break;
          }
        }
      }

      return {
        loginStatus: "INVALIDE",
        error: {
          message: errorMessage
        }
      };
    }
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
