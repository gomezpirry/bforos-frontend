import { Component, OnInit, ViewContainerRef } from '@angular/core'
import { StorageService } from '../../shared/services/storage/storage.service'
import { SlideshareService } from '../../shared/services/slideshare/slideshare.service'
import { ROService} from '../../shared/services/ro/ro.service'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr'

@Component({
    selector: 'app-slideshare',
    templateUrl: './slideshare.component.html',
    styleUrls: ['./slideshare.component.scss'],
    providers: [ROService, StorageService, SlideshareService]
})

export class SlideshareComponent implements OnInit {
    public ros: Array<any> = [];
    public slidesharePresentations: Array<any>;
    public user: Object;
    public searching: boolean = true;
    public slideshareUsername: string = '';
    public slidesharePassword: string = '';

    constructor(private roService: ROService,
        private storageService: StorageService,
        private activatedRoute: ActivatedRoute,
        private slideshareService: SlideshareService,
        public router: Router,
        public toastr: ToastsManager, 
        private vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.user = this.storageService.read<Object>('user');
        if (this.slideshareUsername !== '' && localStorage.getItem('slidesharePresentations') === null) {
            this.search(this.slideshareUsername, this.slidesharePassword);
        } else {
            this.slidesharePresentations = this.storageService.read<Array<any>>('slidesharePresentations');
            this.searching = false;
        }
    }

    search(username: string, password: string){
        this.slideshareUsername = username;
        let presentations = this.slideshareService.search(this.slideshareUsername, this.slidesharePassword, this.user['orcid']).then(presentations => {
            this.slidesharePresentations = presentations;
            this.storageService.write('slidesharePresentations', this.slidesharePresentations);
            this.searching = false;
        });
    }
/*
    claim(researchObject: Object){
        let claimResult = false;
        researchObject['type'] = 'presentation';
        this.roService.claim(this.user['orcid'], researchObject).then(claimResult => {
            this.toastr.success('Presentation Claimed!', 'Success!', {toastLife: 3000, showCloseButton: false});
            researchObject['claimed'] = true;
            this.storageService.write('slidesharePresentations', this.slidesharePresentations);
        });
    }*/
}
