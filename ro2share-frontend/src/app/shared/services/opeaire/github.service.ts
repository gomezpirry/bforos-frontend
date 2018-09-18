import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GithubService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private authUrl = 'http://localhost:8080/github';  // URL to web api

  constructor(private http: Http) { }

  auth(code: string, orcid:string): Promise<Object> {
    const url = `${this.authUrl}/auth?github_auth_code=${code}&orcid=${orcid}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Object)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
