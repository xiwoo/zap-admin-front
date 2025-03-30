
export interface CookieOptions {
  expires: Date;
  maxAge: number;
  domain: string;
  path: string;
  secure: boolean;
  httpOnly: boolean;
  sameSite: boolean | "lax" | "strict" | "none";
  priority: "low" | "medium" | "high";
  partitioned: boolean;
  // encode: Function;
}

export default class ServiceAPI {

  static _SERVICE_API_ADDRESS = process.env.NEXT_PUBLIC_API_URL;

  static getCookie = (name: string): Promise<string | undefined> => {
    throw Error('required Override Method: getCookie');
  }

  static setCookie = (name: string, value: string, options?: Partial<CookieOptions>): Promise<void> => {
    throw Error('required Override Method: setCookie');
  }
}