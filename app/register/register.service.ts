import {Injectable} from '@angular/core';
import {Headers, Http, Response, RequestOptions} from '@angular/http';
import {ErrorHandler} from '../utils/errorhandler'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegisterService {


  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  private requestOptions = new RequestOptions(
    {
      headers: this.headers
    });
  private url = "http://localhost:3004/register";

  public constructor(private http: Http) {

  }

  public register(username: string, password: string): Promise<any> {
    return this.http.post(this.url, JSON.stringify({username: username, password: password}), this.requestOptions)
      .map((res: Response) =>
        res
      )
      .toPromise()
      .catch(ErrorHandler.handleError);
  }
}

