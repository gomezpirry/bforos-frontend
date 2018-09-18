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

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResearcherService} from './Researcher.service';
import {TdLoadingService} from '@covalent/core';
import {CreateResearcherDialogComponent} from './create-researcher-dialog/create-researcher-dialog.component';
import {MatDialog} from '@angular/material';
import {UpdateResearcherDialogComponent} from './update-researcher-dialog/update-researcher-dialog.component';
import {DeleteResearcherDialogComponent} from './delete-researcher-dialog/delete-researcher-dialog.component';

@Component({
	selector: 'app-researcher',
	templateUrl: './Researcher.component.html',
	styleUrls: ['./Researcher.component.css'],
	providers: [ResearcherService]
})
export class ResearcherComponent implements OnInit {
	displayedColumns = ['email', 'firstName', 'lastNam', 'wallet', 'actions'];

	private allParticipants;
	private errorMessage;

	constructor(private serviceResearcher: ResearcherService,
							private loadingService: TdLoadingService,
							public fb: FormBuilder,
							public createParticipantDialog: MatDialog,
							public updateParticipantDialog: MatDialog,
							public deleteParticipantDialog: MatDialog) { }

	ngOnInit(): void {
		this.loadAll();
	}

	loadAll(): void {
		this.registerLoading();
		const tempList = [];
		this.serviceResearcher.getAll().subscribe(
			(result) => {
				this.errorMessage = null;
				result.forEach(participant => {
					tempList.push(participant);
				});
				this.allParticipants = tempList;
				this.resolveLoading();
			},
			(error) => {
				if (error === 'Server error') {
					this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
				}	else if (error === '404 - Not Found') {
					this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
				}	else {
					this.errorMessage = error;
				}
				this.resolveLoading();
			});
	}

	/**
	 * Event handler for changing the checked state of a checkbox (handles array enumeration values)
	 * @param {String} name - the name of the participant field to update
	 * @param {any} value - the enumeration value for which to toggle the checked state
	 */
	changeArrayValue(name: string, value: any): void {
		const index = this[name].value.indexOf(value);
		if (index === -1) {
			this[name].value.push(value);
		} else {
			this[name].value.splice(index, 1);
		}
	}

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
	 * only). This is used for checkboxes in the participant updateDialog.
	 * @param {String} name - the name of the participant field to check
	 * @param {any} value - the enumeration value to check for
	 * @return {Boolean} whether the specified participant field contains the provided value
	 */
	hasArrayValue(name: string, value: any): boolean {
		return this[name].value.indexOf(value) !== -1;
	}

	openCreateParticipantDialog(): void {
		const dialogRef = this.createParticipantDialog.open(CreateResearcherDialogComponent);

		dialogRef.afterClosed().subscribe(result => {
			if (result && result.update) {
				this.loadAll();
			}
		}, error => {
			console.error(error);
		});
	}

	openUpdateParticipantDialog(id: any): void {
		const dialogRef = this.updateParticipantDialog.open(UpdateResearcherDialogComponent, {
			data: { id: id }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result && result.update) {
				this.loadAll();
			}
		}, error => {
			console.error(error);
		});
	}

	openDeleteParticipantDialog(id: any): void {
		const dialogRef = this.deleteParticipantDialog.open(DeleteResearcherDialogComponent, {
			data: { id: id }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result && result.update) {
				this.loadAll();
			}
		}, error => {
			console.error(error);
		});
	}

	registerLoading(): void {
		this.loadingService.register('getParticipants');
	}

	resolveLoading(): void {
		this.loadingService.resolve('getParticipants');
	}
}
