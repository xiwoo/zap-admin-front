
export default class ServiceAPI {

  static _SERVICE_API_ADDRESS = process.env.NEXT_PUBLIC_API_URL;

  static handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
      throw new Error('API 요청 실패');
    }
    
    // console.log(`response: `, response)
    return await response.json() as T;
  }
}