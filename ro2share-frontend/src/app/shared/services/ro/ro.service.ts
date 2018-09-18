import { Injectable }    from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class ROService {
    private headers = new HttpHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'});
    private roUrl = `${environment.serviceUrl}/api/ResearchOJ`;  // URL to web api
    private claimUrl = `${environment.serviceUrl}/api/Claim`;
    private mineRO: Object[] = [];

    constructor(private http: HttpClient) { }

    claim(orcid: string, roId:string): Promise<Object> {
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let claim = {
        "$class": "org.bforos.Claim",
         Ro:  "resource:org.bforos.ResearchOJ#" + roId,
         claimer: "resource:org.bforos.Researcher#" + orcid
      }
      return this.http.post(this.claimUrl, claim, {headers: this.headers})
        .toPromise()
        .then(response => response as Object)
        .catch(this.handleError);
    }

    isClaimed(orcid: string, roId: string): Promise<boolean> {
      let filter = this.encodeString(`{"where":{"and":[{"Ro":"resource:org.bforos.ResearchOJ#${roId}"},{"claimer":"resource:org.bforos.Researcher#${orcid}"}]}}`);
      return this.http.get<Object[]>(`${this.claimUrl}?filter=${filter}`, {observe: 'response', headers: this.headers}).toPromise()
      .then(result => { return result.body.length > 0})
			.catch(() => { return false });

    }

    getSingle(roId: string): Promise<Object> {
      let url = this.encodeString(roId);
      console.log(url);
      return this.http.get(`${this.roUrl}/${url}`).toPromise();
    }

    add(ro: Object): Promise<Object> {
      return this.http.post(`${this.roUrl}`, ro, {observe: 'response', headers: this.headers}).toPromise();
    }

    exists(roId: string): Promise<boolean> {
      let url = this.encodeString(roId);
      console.log(url);
      return this.http.head(`${this.roUrl}/${url}`, {observe: 'response', headers: this.headers}).toPromise()
        .then(response => { return  response.status == 200 })
        .catch(error => { return false })
    }

    mine(orcid: string): Promise<Array<any>> {
      let filter = this.encodeString(`{"where":{"claimer": "resource:org.bforos.Researcher#${orcid}"}}`);
      const url = this.claimUrl + "?filter=" + filter;
      return this.http.get(url, {headers: this.headers})
        .toPromise()
        .then(async response => { 
          let Ro: Object[] = response as Array<Object>;
          for(let i = 0; i < Ro.length; i++){
            let Roid: string = Ro[i]['Ro']; 
            Roid = Roid.substring(Roid.indexOf('#') + 1, Roid.length);
            await this.http.get(this.roUrl + "/" + this.encodeString(Roid), {headers: this.headers}).toPromise()
            .then(result => {
              this.mineRO.push(result as Object);
            })
            .catch(this.handleError)
          }
          return this.mineRO;
        })
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

    encodeString(uri: string) : string {
        let encode = uri.replace(/\//g, "%2F");
        encode = encode.replace(/\:/g, "%3A");
        encode = encode.replace(/\{/g, "%7B");
        encode = encode.replace(/\"/g, "%22");
        encode = encode.replace(/\[/g, "%5B");
        encode = encode.replace(/\]/g, "%5D");
        encode = encode.replace(/\#/g, "%23");
        return encode;
    }
}