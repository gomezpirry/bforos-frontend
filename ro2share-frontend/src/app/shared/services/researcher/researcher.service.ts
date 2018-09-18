import { Injectable }    from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ResearcherService {
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private researcherUrl = `${environment.serviceUrl}/api/Researcher/`;  // URL to web api

    constructor(private http: HttpClient) { }


    add(researcher: Object) : Promise<Object> {
        return this.http.post(this.researcherUrl, researcher, {headers: this.headers})
        .toPromise()
        .then(response => response)
        .catch(this.handleError);
    }

    find(orcid: string) : Promise<Object> {
        return this.http.get(this.researcherUrl + orcid , {headers: this.headers})
        .toPromise()
        .then(response => response)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

     
}
