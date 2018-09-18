import { Injectable }    from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DiSCOService {
    private headers = new HttpHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'});
    private discoUrl = `${environment.serviceUrl}/api/Disco`;  // URL to web api
    private roUrl = `${environment.serviceUrl}/api/ResearchOJ`;  // URL to web api

    constructor(private http: HttpClient) { }

    create(orcid: string, disco:Object): Promise<Object> {
      let id = Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000;
      let objs : string[] = [];
      for(let i = 0; i < disco['Robjs'].length; i++){
        objs.push(`resource:org.bforos.ResearchOJ#${disco['Robjs'][i]}`);
      }
      let newDisco = {
        "$class": "org.bforos.Disco",
        DiscoId: id,
        title: disco['title'],
        Robjs: objs,
        owner: 'resource:org.bforos.Researcher#' + orcid
      
      }
      return this.http.post(this.discoUrl, newDisco, {headers: this.headers})
        .toPromise()
        .then(response => response as Object)
        .catch(this.handleError);
    }


    update(orcid: string, disco:Object): Promise<Object> {
      let id = disco['DiscoId'];
      let objs : string[] = [];
      for(let i = 0; i < disco['Robjs'].length; i++){
        objs.push(`resource:org.bforos.ResearchOJ#${disco['Robjs'][i]}`);
      }
      disco['Robjs'] = objs;
      disco['owner'] = orcid;
      delete disco['DiscoId'];
      return this.http.put(this.discoUrl + "/" + id, disco, {headers: this.headers})
        .toPromise()
        .then(response => response as Object)
        .catch(this.handleError);
    }


    mine(orcid: string): Promise<Array<any>> {
      let filter = this.encodeString(`{"where":{"owner": "resource:org.bforos.Researcher#${orcid}"}}`);
      const url = this.discoUrl + "?filter=" + filter;
      return this.http.get(url, {headers: this.headers})
        .toPromise()
        .then(response => response as Array<Object>)
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