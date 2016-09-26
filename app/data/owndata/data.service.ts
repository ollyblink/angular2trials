import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {ErrorHandler} from '../../utils/errorhandler'
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class DataService {

  private url: string = 'http://localhost:3004/data';

  constructor(private http: Http) {
  }


  public getOwnData(): Promise<any> {
    if (localStorage.getItem('user')) {
      return this.http.get(this.url + '/username/' + localStorage.getItem('user'), {withCredentials: true})
        .map((res: Response) => res.json())
        .toPromise()
        .catch(ErrorHandler.handleError);
    } else {
      return null;
    }
  }

  public deleteItem(title: string): Promise<any> {
    if (localStorage.getItem('user')) {
      return this.http.delete(this.url + '/user/' + localStorage.getItem('user') + "/item/" + title, {withCredentials: true})
        .map((res: Response) => res.json().message)
        .toPromise()
        .catch(ErrorHandler.handleError);
    } else {
      return null;
    }
  }

  private headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  private requestOptions = new RequestOptions(
    {
      headers: this.headers,
      withCredentials: true
    });

  public addItem(title: string, fvc: number, fev1: number): Promise<string> {
    if (localStorage.getItem('user')) {
      let body = 'title=' + title + '&fvc=' + fvc + '&fev1=' + fev1;
      return this.http.post(this.url, body, this.requestOptions)
        .map((res: Response)=>res.json().message)
        .toPromise()
        .catch(ErrorHandler.handleError);
    } else {
      return null;
    }
  }
}
