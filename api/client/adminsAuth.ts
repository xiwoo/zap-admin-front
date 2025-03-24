import ky from 'ky';
import ServiceAPI from '../serviceApi';

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

class AdminsAuthAPI extends ServiceAPI {

  static postLogin = async (credentials: LoginReq): LoginResp => {
    try {
      const response = await ky.post<string>(
        `${super._SERVICE_API_ADDRESS}/admin/auth/v1/login`, 
        { credentials: 'include', json: credentials },
      );
      
      return {
        loginStatus: await super.handleResponse<string>(response),
        error: null
      }
    }
    catch(error) {
      if ( error.name === 'HTTPError' ) {
        const serverMessage = await error.response.text()
        console.log(serverMessage);
        
        var errorMessage = null;
        switch(error.response.status) {
          case 401: {
            errorMessage = "로그인 정보가 맞지 않습니다.";
            break;
          }
          case 403: {
            errorMessage = serverMessage === "Password Reset Required" ? "비밀번호 초기화 대상 유저입니다. 관리자에 문의하세요." : "서버 오류입니다. 관리자에 문의하세요";
            break;
          }
          default: {
            errorMessage = "서버 오류입니다. 관리자에 문의하세요";
            break;
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
  }

  // TODO: 리턴처리 제대로
  static postChangePassword = async (passwordForm: PasswordFormReq) => {

    try {
      const response = await ky.post<string>(
        `${super._SERVICE_API_ADDRESS}/admin/auth/v1/change/password`, 
        { credentials: 'include', json: passwordForm },
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

export default AdminsAuthAPI;