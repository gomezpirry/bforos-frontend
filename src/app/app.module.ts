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

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {DataService} from './data.service';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ResearchOJComponent} from './ResearchOJ/ResearchOJ.component';

import {ResearcherComponent} from './Researcher/Researcher.component';
import {InstitutionComponent} from './Institution/Institution.component';

import {ClaimComponent} from './Claim/Claim.component';
import {CollectComponent} from './Collect/Collect.component';
import {EnrichComponent} from './Enrich/Enrich.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularMaterialModule} from './angular-material/angular-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CreateResearchOJDialogComponent } from './ResearchOJ/create-research-oj-dialog/create-research-oj-dialog.component';
import { UpdateResearchOJDialogComponent } from './ResearchOJ/update-research-oj-dialog/update-research-oj-dialog.component';
import { DeleteResearchOJDialogComponent } from './ResearchOJ/delete-research-oj-dialog/delete-research-oj-dialog.component';
import { CreateResearcherDialogComponent } from './Researcher/create-researcher-dialog/create-researcher-dialog.component';
import { UpdateResearcherDialogComponent } from './Researcher/update-researcher-dialog/update-researcher-dialog.component';
import { DeleteResearcherDialogComponent } from './Researcher/delete-researcher-dialog/delete-researcher-dialog.component';

// import { TransactionComponent } from './Transaction/Transaction.component'

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		// TransactionComponent,
		ResearchOJComponent,
		ResearcherComponent,
		InstitutionComponent,
		ClaimComponent,
		CollectComponent,
		EnrichComponent,
		CreateResearchOJDialogComponent,
		UpdateResearchOJDialogComponent,
		DeleteResearchOJDialogComponent,
		CreateResearcherDialogComponent,
		UpdateResearcherDialogComponent,
		DeleteResearcherDialogComponent
	],
	entryComponents: [
		CreateResearchOJDialogComponent,
		UpdateResearchOJDialogComponent,
		DeleteResearchOJDialogComponent,
		CreateResearcherDialogComponent,
		UpdateResearcherDialogComponent,
		DeleteResearcherDialogComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AppRoutingModule,
		AngularMaterialModule
	],
	providers: [
		DataService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
