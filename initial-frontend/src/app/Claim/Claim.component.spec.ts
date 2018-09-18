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

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Configuration} from '../configuration';
import {DataService} from '../data.service';
import {ClaimComponent} from './Claim.component';
import {ClaimService} from './Claim.service';

describe('ClaimComponent', () => {
	let component: ClaimComponent;
	let fixture: ComponentFixture<ClaimComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ClaimComponent],
			imports: [
				BrowserModule,
				FormsModule,
				ReactiveFormsModule,
				HttpModule
			],
			providers: [ClaimService, DataService, Configuration]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ClaimComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

