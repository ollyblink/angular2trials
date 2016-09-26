import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {ErrorHandler} from "../utils/errorhandler";
import 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LogoutService {

  // private headers = new Headers({
  //   'Content-Type': 'application/json'
  // });
  private requestOptions = new RequestOptions(
    {
      // headers: this.headers,
      withCredentials: true
    });
  private url = "http://localhost:3004/logout";

  constructor(private http: Http) {
  }

  public logout(): Promise<any> {
    return this.http.get(this.url, this.requestOptions)
      .map((res: Response) => res.json())
      .toPromise()
      .catch(ErrorHandler.handleError);
  }
}
