
export default class ServiceAPI {
  // static _SERVICE_API_ADDRESS = "https://dev.devxiwoo.com";
  static _SERVICE_API_ADDRESS = "http://localhost:8080";

  static handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
      throw new Error('API 요청 실패');
    }
    
    // console.log(`response: `, response)
    return await response.json() as T;
  }
}