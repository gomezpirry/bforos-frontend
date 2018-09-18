import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
	public options = {
	    position: ["bottom", "left"],
	    timeOut: 5000,
	    lastOnBottom: true
	}

    constructor(public router: Router) { }

    ngOnInit() {
        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }
    }

}
