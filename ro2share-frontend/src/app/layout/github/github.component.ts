import { Component, OnInit, ViewContainerRef } from '@angular/core'
import { StorageService } from '../../shared/services/storage/storage.service'
import { GithubService } from '../../shared/services/github/github.service'
import { ROService} from '../../shared/services/ro/ro.service'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr'
import { environment } from '../../../environments/environment'

@Component({
    selector: 'app-github',
    templateUrl: './github.component.html',
    styleUrls: ['./github.component.scss'],
    providers: [ROService, StorageService, GithubService]
})

export class GithubComponent implements OnInit {
    public ros: Array<any> = [];
    public githubRepos: Array<any>;
    public user: Object;
    public searching: boolean = true;
    public githubURL = "https://github.com/login/oauth/authorize?scope=user:email&client_id=" + environment.githubClientId;

    constructor(private roService: ROService,
        private storageService: StorageService,
        private activatedRoute: ActivatedRoute,
        private githubService: GithubService,
        public router: Router,
        public toastr: ToastsManager, 
        private vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.user = this.storageService.read<Object>('user');
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            let code = params['code'];
            if (typeof code !== 'undefined' && localStorage.getItem('githubRepos') === null) {
                this.githubService.auth(code, this.user['id']).then(async repos => {
                    console.log(repos);
                    this.githubRepos = repos;
                    this.storageService.write('githubRepos', this.githubRepos);
                    this.router.navigateByUrl('/github');
                    this.searching = false;
                });
                //this.githubService.auth(code, this.user['orcid']).then(result => {console.log(result)})
            } else {
                this.githubRepos = this.storageService.read<Array<any>>('githubRepos');
                this.searching = false;
            }
          });
          console.log(this.user);
    }

    claim(researchObject: any){
        console.log(researchObject['body']);
        let claimResult = false;
        researchObject['type'] = 'repo';
        this.roService.claim(this.user['id'], researchObject['body']['ROId']).then(claimResult => {
            this.toastr.success('Repositoty Claimed!', 'Success!', {toastLife: 3000, showCloseButton: false});
            researchObject['claimed'] = true;
            this.storageService.write('githubRepos', this.githubRepos);
        });
    }
}
