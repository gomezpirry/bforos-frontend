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
import {ResearchOJService} from './ResearchOJ.service';
import {MatDialog} from '@angular/material';
import {CreateResearchOJDialogComponent} from './create-research-oj-dialog/create-research-oj-dialog.component';
import {TdLoadingService} from '@covalent/core';
import {UpdateResearchOJDialogComponent} from './update-research-oj-dialog/update-research-oj-dialog.component';
import {DeleteResearchOJDialogComponent} from './delete-research-oj-dialog/delete-research-oj-dialog.component';
// import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-researchoj',
	templateUrl: './ResearchOJ.component.html',
	styleUrls: ['./ResearchOJ.component.css'],
	providers: [ResearchOJService]
})
export class ResearchOJComponent implements OnInit {
	displayedColumns = ['roid', 'typero', 'address', 'reward', 'cost', 'owner', 'contributor', 'actions'];

	private allAssets;
	private errorMessage;

	constructor(private serviceResearchOJ: ResearchOJService,
							private loadingService: TdLoadingService,
							public createAssetDialog: MatDialog,
							public updateAssetDialog: MatDialog,
							public deleteAssetDialog: MatDialog) { }

	ngOnInit(): void {
		this.loadAll();
	}

	loadAll(): void {
		this.registerLoading();
		const tempList = [];
		this.serviceResearchOJ.getAll().subscribe(
			(result) => {
				this.errorMessage = null;
				result.forEach(asset => {
					tempList.push(asset);
				});
				this.allAssets = tempList;
				this.resolveLoading();
			},
			(error) => {
				if (error === 'Server error') {
					this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
				} else if (error === '404 - Not Found') {
					this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
				}	else {
					this.errorMessage = error;
				}
				this.resolveLoading();
			});
	}

	/**
	 * Event handler for changing the checked state of a checkbox (handles array enumeration values)
	 * @param {String} name - the name of the asset field to update
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
	 * only). This is used for checkboxes in the asset updateDialog.
	 * @param {String} name - the name of the asset field to check
	 * @param {any} value - the enumeration value to check for
	 * @return {Boolean} whether the specified asset field contains the provided value
	 */
	hasArrayValue(name: string, value: any): boolean {
		return this[name].value.indexOf(value) !== -1;
	}

	openCreateAssetDialog(): void {
		const dialogRef = this.createAssetDialog.open(CreateResearchOJDialogComponent);

		dialogRef.afterClosed().subscribe(result => {
			if (result && result.update) {
				this.loadAll();
			}
		}, error => {
			console.error(error);
		});
	}

	openUpdateAssetDialog(id: any): void {
		const dialogRef = this.updateAssetDialog.open(UpdateResearchOJDialogComponent, {
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

	openDeleteAssetDialog(id: any): void {
		const dialogRef = this.deleteAssetDialog.open(DeleteResearchOJDialogComponent, {
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

	parseHyperledgerID(value: String): String {
		if (value) {
			value = value.split('#')[1];
		}
		return value;
	}

	registerLoading(): void {
		this.loadingService.register('getAssets');
	}

	resolveLoading(): void {
		this.loadingService.resolve('getAssets');
	}
}
