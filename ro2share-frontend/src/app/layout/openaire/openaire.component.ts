import { Component, OnInit, ViewContainerRef } from '@angular/core'
import { StorageService } from '../../shared/services/storage/storage.service'
import { OpenAIREService } from '../../shared/services/openaire/openaire.service'
import { ROService} from '../../shared/services/ro/ro.service'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

@Component({
    selector: 'app-openaire',
    templateUrl: './openaire.component.html',
    styleUrls: ['./openaire.component.scss'],
    providers: [ROService, StorageService, OpenAIREService]
})

export class OpenaireComponent implements OnInit {
    public ros: Array<any> = [];
    public openAIREResults: Array<any> = [];
    public user: Object;
    public searching: boolean = true;
    public selectedResult: Object;
    public selectedContributor: string = "";
    closeResult: string;

    constructor(private roService: ROService,
        private storageService: StorageService,
        private activatedRoute: ActivatedRoute,
        private openaireService: OpenAIREService,
        public router: Router,
        public toastr: ToastsManager, 
        private vcr: ViewContainerRef,
        private modalService: NgbModal) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.user = this.storageService.read<Object>('user');
        if (localStorage.getItem('openAIREResults') === null) {
            let presentations = this.openaireService.getResults(this.user['orcid']).then(researchObjects => {
                this.openAIREResults = researchObjects;
                this.storageService.write('openAIREResults', this.openAIREResults);
                this.searching = false;
            });
        } else {
            this.openAIREResults = this.storageService.read<Array<any>>('openAIREResults');
            this.searching = false;
        }
    }
/*
    claim(researchObject: Object){
        let claimResult = false;
        this.roService.claim(this.user['orcid'], researchObject).then(claimResult => {
            this.toastr.success('OpenAIRE result Claimed!', 'Success!', {toastLife: 3000, showCloseButton: false});
            researchObject['claimed'] = true;
            this.storageService.write('openAIREResults', this.openAIREResults);
        });
    }

    open(content, result) {
        this.selectedResult = result;
        console.log(this.selectedResult);
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.selectedResult = {};
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            for (var i = reason.lists.contributors.length - 1; i >= 0; i--) {
                if (reason.lists.contributors[i].name == this.selectedContributor) {
                    reason.lists.contributors[i].identifiers.push(this.user['orcid']);
                }
                reason.lists.contributors[i].sameAsUri = "http://api.openaire.eu/search/publications?openaireAuthorID=" + reason.lists.contributors[i].id
            }
            this.claim(reason);
        });
    }

*/
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

}
