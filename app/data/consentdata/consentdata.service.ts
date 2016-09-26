import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {ErrorHandler} from "../../utils/errorhandler";

@Injectable()
export class ConsentDataService {
  private url: string = 'http://localhost:3004/';

  public constructor(private http: Http) {
  }

  public getOtherData(username: string): Promise<any> {
    if (localStorage.getItem('user')) {
    return this.http.get(this.url + 'data/username/' + username, {withCredentials: true})
      .map((res: Response) => res.json())
      .toPromise()
      .catch(ErrorHandler.handleError);
    } else {
      return null;
    }
  }

  public getUsersToGrantConsentTo(): Promise<any> {
    if (localStorage.getItem('user')) {
      return this.http.get(this.url+"consents/received", {withCredentials: true})
        .map((res: Response) => res.json().consentedUsers)
        .toPromise()
        .catch(ErrorHandler.handleError);
    } else {
      return null;
    }
  }
}
