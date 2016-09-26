import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {ErrorHandler} from "../../utils/errorhandler";

@Injectable()
export class GrantConsentService {
  private url = "http://localhost:3004/consents/"
  private headers = new Headers({
      'Content-Type': 'application/json'
    }
  );
  private requestOptions = new RequestOptions(
    {
      headers: this.headers,
      withCredentials: true
    }
  );


  public constructor(private http: Http) {

  }

  public grantDataAccess(username: string): Promise<string> {
    if (localStorage.getItem('user')) {
      return this.http.post(this.url, {receiver: username}, this.requestOptions)
        .map((res: Response) => res.json().message)
        .toPromise()
        .catch(ErrorHandler.handleError)
    } else {
      return null;
    }
  }

  public getUsersToGrantDataAccessTo(): Promise<string[]> {
    if (localStorage.getItem('user')) {
      return this.http.get(this.url, {withCredentials: true})
        .map((res: Response) => res.json().authorisableUsers)
        .toPromise()
        .catch(ErrorHandler.handleError);
    } else {
      return null;
    }
  }


  //TODO: Refactor into own service (GrantConsentComponent)
  public getSentUsers(): Promise<string[]> {
    if (localStorage.getItem('user')) {
      return this.http.get(this.url + '/sent', {withCredentials: true})
        .map((res: Response) => res.json().consentedUsers)
        .toPromise()
        .catch(ErrorHandler.handleError);
    } else {
      return null;
    }
  }

  public deleteSentUser(receiver: string): Promise<string> {
    if (localStorage.getItem('user')) {
      return this.http.delete(this.url + '/sender/'+localStorage.getItem('user')+"/receiver/"+receiver, {withCredentials: true})
        .map((res: Response) => res.json().message)
        .toPromise()
        .catch(ErrorHandler.handleError);
    } else {
      return null;
    }
  }

  //End TODO
}
