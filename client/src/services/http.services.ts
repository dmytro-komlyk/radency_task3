import { HttpMethod, HttpHeader } from '../common/enums/enums';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface IHttpOptions {
  method: string;
  payload?: any;
  contentType: string;
  query?: object;
}

class Http {
  _siteUrl: string;

  constructor({ siteUrl }: { siteUrl: string }) {
    this._siteUrl = siteUrl;
  }
  
  load(apiPath: string, options: IHttpOptions) {
    const {
      method = HttpMethod.GET,
      payload = {},
      contentType,
      query = {},
    } = options;

    const headers = this._getHeaders({
      contentType
    });
  
    const httpRequestConfig: AxiosRequestConfig = {
      url: apiPath,
      method,
      headers,
      baseURL: this._siteUrl,
      params: query,
      data: payload,
    };

  return axios(httpRequestConfig)
    .then((response) => response.data)
    .catch(this._throwError);
  }

  _getHeaders({ contentType }: { contentType: string }) {
    const headers: { [key: string]: string }  = {};
    if (contentType) {
      headers[HttpHeader.CONTENT_TYPE] = contentType;
    } else {
      headers[HttpHeader.CONTENT_TYPE] = 'application/json';
    }
    return headers;
  }

  _throwError(err: AxiosError) {
    throw err;
  }
}
  
export { Http };