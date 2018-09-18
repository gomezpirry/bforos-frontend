import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { AuthService } from '../shared/services/auth/auth.service'
import { StorageService } from '../shared/services/storage/storage.service'
import { Location  } from '@angular/common';
import { environment } from '../../environments/environment' 
import { ResearcherService } from '../shared/services/researcher/researcher.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [AuthService, StorageService, ResearcherService]
})

export class LoginComponent implements OnInit {

	user: Object;

    constructor(public router: Router,
    			private activatedRoute: ActivatedRoute,
    			private authService: AuthService,
    			private storageService: StorageService,
                private location: Location) { }

    ngOnInit() {
    	this.activatedRoute.queryParams.subscribe((params: Params) => {
    	    let code = params['code'];
    	    if (typeof code !== 'undefined' && localStorage.getItem('isLoggedin') === null) {
    	    	let user = this.authService.auth(code).then(user => {
    	    		this.user = user;
    	    		this.storageService.write('user', this.user);
    	    		this.storageService.write('isLoggedin', 'true');
    	    		this.router.navigateByUrl('/github');
    	    	});
    	    }
    	  });
    }

    onLoggedin() {
    	var oauthWindow = window.open(`https://sandbox.orcid.org/oauth/authorize?client_id=${environment.clientId}&response_type=code&scope=/authenticate&redirect_uri=${window.location.href}`, "_self", "toolbar=no, scrollbars=yes, width=500, height=600, top=500, left=500");
    }

}
