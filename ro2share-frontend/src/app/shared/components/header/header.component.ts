import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { StorageService } from '../../services/storage/storage.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [StorageService]
})
export class HeaderComponent implements OnInit {

    userName: string;

    constructor(private translate: TranslateService, private storageService: StorageService) { }

    ngOnInit() {
        let user = this.storageService.read<Object>('user');
        this.userName = user['firstName'] + ' ' +  user['lastName'];
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('githubRepos');
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('user');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
