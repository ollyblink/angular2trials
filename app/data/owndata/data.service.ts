import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {ErrorHandler} from '../../utils/errorhandler'
import {credentials} from "../../utils/credentials";
import {Data} from "../../models/data";
import {postRequestOptionsWithCredentials} from "../../utils/requestoptionconfigs";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {

  /** Base URL for data actions */
  private url: string;

  constructor(private http: Http) {
    this.url = credentials.host + ":" + credentials.port + "/data/";
  }


  /**
   *
   * @returns {any} returns an array of data items and the user these items belong to, or an error message.
   */
  public getOwnData(): Promise<any> {
    if (localStorage.getItem('user')) {
      return this.http.get(this.url + 'username/' + localStorage.getItem('user'), {withCredentials: true})
        .map((res: Response) => res.json())
        .toPromise()
        .catch(ErrorHandler.handleError);
    } else {
      return new Promise((resolve, reject) => {
        resolve(ErrorHandler.USER_NOT_FOUND);
      });
    }
  }

  public deleteDataItem(title: string): Promise<any> {
    if (localStorage.getItem('user')) {
      let targetUrl = this.url + 'user/' + localStorage.getItem('user') + "/item/" + title;
      return this.http.delete(targetUrl, {withCredentials: true})
        .map((res: Response) => res.json().message)
        .toPromise()
        .catch(ErrorHandler.handleError);
    } else {
      return new Promise((resolve, reject) => {
        resolve(ErrorHandler.USER_NOT_FOUND);
      });
    }
  }

  public addDataItem(data: Data): Promise<string> {
    if (localStorage.getItem('user')) {
      let body = JSON.stringify({
        title: data.title,
        fvc: data.fvc,
        fev1: data.fev1
      });
      return this.http.post(this.url, body, postRequestOptionsWithCredentials)
        .map((res: Response)=>res.json().message)
        .toPromise()
        .catch(ErrorHandler.handleError);
    } else {
      return new Promise((resolve, reject) => {
        resolve(ErrorHandler.USER_NOT_FOUND);
      });
    }
  }
}
