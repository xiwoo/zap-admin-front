import got from 'got';
import { cookies } from 'next/headers'

import ServiceAPI, { CookieOptions } from "../ServiceAPI";

export default class ServerServiceAPI extends ServiceAPI {

  static SERVICE_GOT = got.extend({
    // prefixUrl: this._SERVICE_API_ADDRESS,
    hooks: {
      beforeRequest: [
        async options => {
          const jwt = await this.getCookie("JWT");
          if (jwt) {
            options.headers['Authorization'] = `Bearer ${jwt}`;
          }
        },
      ],
    },
  });

  static getCookie = async (name: string): Promise<string | undefined> => {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
  }

  static setCookie = async (name: string, value: string, options?: Partial<CookieOptions>): Promise<void> => {
    const cookieStore = await cookies();
    cookieStore.set(name, value, options);
  }
}