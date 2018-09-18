import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SHAREService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private shareUrl = `${environment.serviceUrl}/share`;  // URL to web api

    constructor(private http: Http) { }

    getResults(orcid: string): Promise<Array<Object>> {
      const url = `${this.shareUrl}/search/?orcid=${orcid}`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json() as Array<Object>)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}