import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../shared/services/storage/storage.service'
import { ROService} from '../../shared/services/ro/ro.service'

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    providers: [ROService, StorageService]
})
export class ChartsComponent implements OnInit {
    public ros: Array<any> = [];
    public user: Object;
    constructor(private roService: ROService, private storageService: StorageService) { }
    ngOnInit() {
        this.user = this.storageService.read<Object>('user');
        this.roService.mine(this.user['id']).then(ros => {
            console.log(ros);
            this.ros = ros });
    }
}
