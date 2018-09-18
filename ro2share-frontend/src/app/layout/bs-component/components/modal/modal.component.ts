import { Component, OnInit, ViewContainerRef } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { StorageService } from '../../../../shared/services/storage/storage.service'
import { ROService} from '../../../../shared/services/ro/ro.service'
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect'
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect'
import { IMultiSelectSettings } from 'angular-2-dropdown-multiselect'
import { DiSCOService } from '../../../../shared/services/disco/disco.service'
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr'
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    providers: [ROService, StorageService, DiSCOService]
})
export class ModalComponent implements OnInit {
    closeResult: string;
    user: Object;
    searching: boolean = true;
    options: Object = {};
    public Robjs: Array<any> = [];
    public discos: Array<any> = [];
    public disco: Object = {title: '', Robjs: []};
    public downloadUrl: string = environment.serviceUrl + "/disco/download?uri=";
    public edit: boolean = false;
    myOptions: IMultiSelectOption[];
    mySettings: IMultiSelectSettings = {
        enableSearch: true,
        checkedStyle: 'fontawesome',
        buttonClasses: 'btn btn-block btn-disco',
    };
    

    constructor(private modalService: NgbModal,
                private roService: ROService,
                private storageService: StorageService,
                private discoService: DiSCOService,
                public toastr: ToastsManager, 
                private vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.myOptions = [];
        this.user = this.storageService.read<Object>('user');
        this.roService.mine(this.user['id']).then(Robjs => {
            this.Robjs = Robjs;
            for (let entry of this.Robjs) {
                this.myOptions.push({id: entry['ROId'], name: entry['uri']});
            }
        });
        this.discoService.mine(this.user['id']).then(discos => {
            let titles: string = "";
            this.discos = discos;
            for(let i = 0; i < discos.length; i++){
                for(let j = 0; j < discos[i]['Robjs'].length;j++){
                    titles += discos[i]['Robjs'][j].substring(discos[i]['Robjs'][j].indexOf("#") + 1, discos[i]['Robjs'][j].length) + "|";
                }
                this.discos[i]['titles'] = titles;
                titles = "";
            }
            this.searching = false;
        });
    }

    open(content, disco, edit) {
        this.edit = edit;
        let ids: string[] = [];
        for(let i = 0; i < disco['Robjs'].length; i++){
            ids.push(disco['Robjs'][i].substring(disco['Robjs'][i].indexOf("#") + 1, disco['Robjs'][i].length));
        }
        this.disco['Robjs'] = ids;
        this.disco['title'] = disco['title'];
        this.disco['DiscoId'] = disco['DiscoId'];
        this.disco['owner'] = disco['owner'];
        this.disco['$class'] = disco['$class'];
        console.log(disco);
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.disco = {title: '', Robjs: []};
        }, (reason) => {
            if(edit) {
                //console.log(reason);
                this.discoService.update(this.user['id'], reason).then(update => {
                    this.disco = {title: '', Robjs: []};
                    this.discoService.mine(this.user['id']).then(discos => {
                        this.discos = discos;
                        let titles: string = "";
                        this.discos = discos;
                        for(let i = 0; i < discos.length; i++){
                            for(let j = 0; j < discos[i]['Robjs'].length;j++){
                                titles += discos[i]['Robjs'][j].substring(discos[i]['Robjs'][j].indexOf("#") + 1, discos[i]['Robjs'][j].length) + "|";
                            }
                            this.discos[i]['titles'] = titles;
                            titles = "";
                        }
                        this.toastr.success('Disco updated!', 'Success!', {toastLife: 3000, showCloseButton: false});
                    });
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                });

            } else {
                this.discoService.create(this.user['id'], reason).then(create => {
                    this.disco = {title: '', Robjs: []};
                    this.discoService.mine(this.user['id']).then(discos => {
                        this.discos = discos;
                        let titles: string = "";
                        this.discos = discos;
                        for(let i = 0; i < discos.length; i++){
                            for(let j = 0; j < discos[i]['Robjs'].length;j++){
                                titles += discos[i]['Robjs'][j].substring(discos[i]['Robjs'][j].indexOf("#") + 1, discos[i]['Robjs'][j].length) + "|";
                            }
                            this.discos[i]['titles'] = titles;
                            titles = "";
                        }
                        this.toastr.success('Disco created!', 'Success!', {toastLife: 3000, showCloseButton: false});
                    });
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                });
            }
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

    onChange() { }
}
