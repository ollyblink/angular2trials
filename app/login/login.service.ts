import {Injectable} from '@angular/core';
import {Headers, RequestOptions, Response, Http} from '@angular/http';
import {ErrorHandler} from '../utils/errorhandler';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


import {User} from "../models/user";
import {credentials} from "../utils/credentials";
import {postRequestOptionsWithCredentials} from "../utils/requestoptionconfigs";


@Injectable()
export class LoginService {

  private url: string;

  public constructor(private http: Http) {
    this.url = credentials.host + ":" + credentials.port + "/";
  }

  public login(user: User): Promise<any> {
    let body = JSON.stringify({username: user.username, password: user.password});

    return this.http.post(this.url, body, postRequestOptionsWithCredentials)
      .map((res: Response) => res)
      .toPromise()
      .catch(ErrorHandler.handleError)
  }
}
