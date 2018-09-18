import { Injectable }    from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { ResearcherService } from '../../services/researcher/researcher.service';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private user: Object;
  private researcher;

  constructor(private http: Http,
              private researcherService: ResearcherService) { }

    async auth(code: string): Promise<Object> {
    const url = environment.orcidUrl;
    let headers = new Headers({'Accept': 'application/json'});
    let data = new URLSearchParams();
    data.set('client_id', environment.orcidClientId);
    data.set('client_secret', environment.orcidClientSecret);
    data.set('grant_type', 'authorization_code');
    data.set('code', code);
    data.set('redirect_uri', 'http://localhost:4200/login');
    console.log(data);
    return this.http.post(url, data , {headers: headers})
    .toPromise()
    .then(response =>  {
      this.user = response.json() as Object;
      console.log(this.user);
      return this.researcherService.find(this.user['orcid'])
      .then(result => result)
      .catch(() =>  {  
          let fullName :string;
          fullName = this.user['name'];
          this.researcher = {
            "$class": "org.bforos.Researcher",
            id: this.user['orcid'],
            email: 'example@gmail.com',
            firstName: fullName.substring(0, fullName.indexOf(' ')),
            lastName: fullName.substring(fullName.indexOf(' '), fullName.length),
            creation: new Date(),
            wallet: 10
          };
          return this.researcherService.add(this.researcher)
          .then(result => result)
          .catch(this.handleError);
        });
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    //console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
