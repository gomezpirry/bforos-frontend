import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OpenAIREService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private openaireUrl = `${environment.serviceUrl}/openaire`;  // URL to web api

    constructor(private http: Http) { }

    getResults(orcid: string): Promise<Array<any>> {
      const url = `${this.openaireUrl}/search/?orcid=${orcid}`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json() as Array<any>)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}