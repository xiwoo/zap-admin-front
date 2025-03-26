import ky from 'ky';
import Cookies from 'js-cookie';

import ServiceAPI from "../ServiceAPI";

export default class ClientServiceAPI extends ServiceAPI{

  static SERVICE_KY = ky.create({
    prefixUrl: this._SERVICE_API_ADDRESS,
    hooks: {
      beforeRequest: [
        async request => {
          const jwt = await this.getCookie("JWT");
          if (jwt) {
            request.headers.set('Authorization', jwt);
          }
        },
      ],
    },
  });

  static getCookie = (name: string): Promise<string | undefined> => {
    return Promise.resolve(Cookies.get(name));
  }
}