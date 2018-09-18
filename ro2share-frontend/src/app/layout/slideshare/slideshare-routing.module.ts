import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlideshareComponent } from './slideshare.component';

const routes: Routes = [
    { path: '', component: SlideshareComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SlideshareRoutingModule { }
