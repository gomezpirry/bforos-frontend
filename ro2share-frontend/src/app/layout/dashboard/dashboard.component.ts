import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SHAREService } from '../../shared/services/share/share.service'
import { StorageService } from '../../shared/services/storage/storage.service'
import { ROService} from '../../shared/services/ro/ro.service'
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [SHAREService, StorageService, ROService,]
})
export class DashboardComponent implements OnInit {
    public shareResults: Array<Object> = [];
    public user: Object;
    public searching: boolean = true;
    public selectedResult: Object;
    public selectedContributor: string = "";
    closeResult: string;


    constructor(private shareService: SHAREService,
                private storageService: StorageService,
                private roService: ROService,
                public toastr: ToastsManager, 
                private vcr: ViewContainerRef,
                private modalService: NgbModal) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.user = this.storageService.read<Object>('user');
        this.shareService.getResults(this.user['orcid']).then(shareResults => {
            this.shareResults = shareResults;
            this.searching = false;
        });
    }

    claim(researchObject: Object){
        let claimResult = false;
        researchObject['type'] = 'work';
        this.roService.claim(this.user['orcid'], researchObject['body']['ROId']).then(claimResult => {
            this.toastr.success('Creative Work Claimed!', 'Success!', {toastLife: 3000, showCloseButton: false});
            researchObject['claimed'] = true;
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
                reason.lists.contributors[i].sameAsUri = "https://share.osf.io/person/" + reason.lists.contributors[i].id
            }
            this.claim(reason);
        });
    }


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
