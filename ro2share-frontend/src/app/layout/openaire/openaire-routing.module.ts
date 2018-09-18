import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenaireComponent } from './openaire.component';

const routes: Routes = [
    { path: '', component: OpenaireComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OpenaireRoutingModule { }
