/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import {HomeComponent} from './home/home.component';
import {ResearchOJComponent} from './ResearchOJ/ResearchOJ.component';
import {ResearcherComponent} from './Researcher/Researcher.component';
import {InstitutionComponent} from './Institution/Institution.component';
import {ClaimComponent} from './Claim/Claim.component';
import {CollectComponent} from './Collect/Collect.component';
import {EnrichComponent} from './Enrich/Enrich.component';

const routes: Routes = [
	// { path: 'transaction', component: TransactionComponent },
	{path: '', component: HomeComponent},
	{path: 'ResearchOJ', component: ResearchOJComponent},
	{path: 'Researcher', component: ResearcherComponent},
	{path: 'Institution', component: InstitutionComponent},
	{path: 'Claim', component: ClaimComponent},
	{path: 'Collect', component: CollectComponent},
	{path: 'Enrich', component: EnrichComponent},
	{path: '**', redirectTo: ''}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: []
})
export class AppRoutingModule {
}
