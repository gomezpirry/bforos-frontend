import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { SlideshareRoutingModule } from './slideshare-routing.module';
import { SlideshareComponent } from './slideshare.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        SlideshareRoutingModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
    ],
    declarations: [SlideshareComponent]
})
export class SlideshareModule { }
