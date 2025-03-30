import { HTTPError } from 'got';

import AdminsAuthAPI from '@/api/server/AdminsAuthAPI';

export const POST = async (request: Request): Promise<Response> => {
  
  try {
    
    const { token, status } = await AdminsAuthAPI.postLogin(await request.json());
    
    AdminsAuthAPI.setCookie("JWT", token, { maxAge: 3600 });
    
    return new Response(
      JSON.stringify({ loginStatus: status, }),
    );
  }
  catch ( error ) {

    // console.log(error);
    
    let errorMessage = "서버 오류입니다. 관리자에 문의하세요";

    if ( error instanceof HTTPError ) {

      const serverMessage = error.response.body
      // console.log(serverMessage);
      
      switch ( error.response.statusCode ) {
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

    return new Response(
      JSON.stringify({
        loginStatus: "INVALIDE",
        error: {
          message: errorMessage
        }
      })
    );
  }
}