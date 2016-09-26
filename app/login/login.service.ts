import {Injectable} from '@angular/core';
import {Headers, RequestOptions, Response, Http} from '@angular/http';
import {ErrorHandler} from '../utils/errorhandler';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';


@Injectable()
export class LoginService {

  private headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  private requestOptions = new RequestOptions(
    {
      headers: this.headers,
      withCredentials: true
    });
  private url = "http://localhost:3004/";

  public constructor(private http: Http) {

  }

  public login(username: string, password: string): Promise<any> {
    // let body = JSON.stringify({username: username, password: password});
    // let body = 'username=' + username + '&password=' + password;
    // return this.http.post(this.url, body, this.requestOptions)
    //   .toPromise()
    //   .then(res => res)
    //   .catch(ErrorHandler.handleError);
    let body = 'username=' + username + '&password=' + password;
    return this.http.post(this.url, body, this.requestOptions)
      .map((res: Response) => res)
      .toPromise()
      .catch(ErrorHandler.handleError)
  }
}
/*
 *
 *  let body = 'username=' + username + '&password=' + password;
 return this.http.post(this.url, body, this.requestOptions)
 .map((res: Response) => res)
 .toPromise()
 .catch(ErrorHandler.handleError)
 */
