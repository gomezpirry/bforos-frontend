import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ROService } from '../../services/ro/ro.service';
import { StorageService } from '../../services/storage/storage.service'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GithubService {

  //private headers = new Headers({'Content-Type': 'application/json'});
  //private authUrl = `${environment.serviceUrl}/github`;  // URL to web api
  private repositories: any[] = [];

  constructor(private http: HttpClient,
              private roService: ROService,
              private storageService: StorageService) { }

  auth(code: string, orcid:string): Promise<any[]> {
    const url = `${environment.githubApi}`;
    let headers = new HttpHeaders({'Accept': 'application/json'});
    let body = new HttpParams();
    body = body.set('client_id', environment.githubClientId);
    body = body.set('client_secret', environment.githubClientSecret);
    body = body.set('code', code);
    return this.http.post(url, body, { headers: headers}).toPromise()
    .then(async (result) => {
        return this.http.get(`${environment.githubUserApi}?access_token=${result['access_token']}`).toPromise()
        .then(gitUser => {
          return this.http.get<any[]>(gitUser['repos_url']).toPromise()
            .then(async (repos) => {
              let user = this.storageService.read<Object>('user');
              for (let i = 0; i < repos.length; i++){
                let exist = await this.roService.exists(repos[i]['html_url']);
                console.log(exist);
                if(!exist){
                  let ro = {
                    $class: "org.bforos.ResearchOJ",
                    ROId: repos[i]['html_url'],
                    typero: 'CODE',
                    uri: repos[i]['html_url'],
                    creation: new Date(),
                    owner: orcid
                  }
                  this.roService.add(ro)
                    .then(data => {
                      let repository = data;
                      repository['name'] = repos[i]['name'];
                      repository['claimed'] = false;
                      repository['language'] = repos[i]['language'];
                      repository['description'] = repos[i]['description'];
                      this.repositories.push(repository);
                    })
                    .catch(error => {
                      console.log("Cannot create Research Object ")
                    });
                }
                else{
                  this.roService.getSingle(repos[i]['html_url'])
                    .then(async data => {
                      let repository = data;
                      repository['name'] = repos[i]['name'];
                      repository['language'] = repos[i]['language'];
                      repository['description'] = repos[i]['description'];
                      repository['claimed'] = await this.roService.isClaimed(orcid,repository['ROId']);
                      this.repositories.push(repository);
                    })
                    .catch(error => {
                      console.log("Cannot create Research Object ")
                    })
                }
              }
              return await this.repositories;
            })
            .catch(error => {
              console.log("Don't read repos");
              error.message;
            })
        })
        .catch(this.handleError);
    })
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
