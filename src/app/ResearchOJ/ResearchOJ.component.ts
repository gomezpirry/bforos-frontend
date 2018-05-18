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
// import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-researchoj',
	templateUrl: './ResearchOJ.component.html',
	styleUrls: ['./ResearchOJ.component.css'],
	providers: [ResearchOJService]
})
export class ResearchOJComponent implements OnInit {

	myForm: FormGroup;

	private allAssets;
	private asset;
	private currentId;
	private errorMessage;


	ROId = new FormControl('', Validators.required);


	typero = new FormControl('', Validators.required);


	address = new FormControl('', Validators.required);


	reward = new FormControl('', Validators.required);


	cost = new FormControl('', Validators.required);


	owner = new FormControl('', Validators.required);


	contributor = new FormControl('', Validators.required);


	constructor(private serviceResearchOJ: ResearchOJService, fb: FormBuilder) {
		this.myForm = fb.group({


			ROId: this.ROId,


			typero: this.typero,


			address: this.address,


			reward: this.reward,


			cost: this.cost,


			owner: this.owner,


			contributor: this.contributor


		});
	};

	ngOnInit(): void {
		this.loadAll();
	}

	loadAll(): Promise<any> {
		let tempList = [];
		return this.serviceResearchOJ.getAll()
			.toPromise()
			.then((result) => {
				this.errorMessage = null;
				result.forEach(asset => {
					tempList.push(asset);
				});
				this.allAssets = tempList;
			})
			.catch((error) => {
				if (error == 'Server error') {
					this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
				}
				else if (error == '404 - Not Found') {
					this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
				}
				else {
					this.errorMessage = error;
				}
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

	addAsset(form: any): Promise<any> {
		this.asset = {
			$class: 'org.bforos.ResearchOJ',


			'ROId': this.ROId.value,


			'typero': this.typero.value,


			'address': this.address.value,


			'reward': this.reward.value,


			'cost': this.cost.value,


			'owner': this.owner.value,


			'contributor': this.contributor.value


		};

		this.myForm.setValue({


			'ROId': null,


			'typero': null,


			'address': null,


			'reward': null,


			'cost': null,


			'owner': null,


			'contributor': null


		});

		return this.serviceResearchOJ.addAsset(this.asset)
			.toPromise()
			.then(() => {
				this.errorMessage = null;
				this.myForm.setValue({


					'ROId': null,


					'typero': null,


					'address': null,


					'reward': null,


					'cost': null,


					'owner': null,


					'contributor': null


				});
			})
			.catch((error) => {
				if (error == 'Server error') {
					this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
				}
				else {
					this.errorMessage = error;
				}
			});
	}


	updateAsset(form: any): Promise<any> {
		this.asset = {
			$class: 'org.bforos.ResearchOJ',


			'typero': this.typero.value,


			'address': this.address.value,


			'reward': this.reward.value,


			'cost': this.cost.value,


			'owner': this.owner.value,


			'contributor': this.contributor.value


		};

		return this.serviceResearchOJ.updateAsset(form.get('ROId').value, this.asset)
			.toPromise()
			.then(() => {
				this.errorMessage = null;
			})
			.catch((error) => {
				if (error == 'Server error') {
					this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
				}
				else if (error == '404 - Not Found') {
					this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
				}
				else {
					this.errorMessage = error;
				}
			});
	}


	deleteAsset(): Promise<any> {

		return this.serviceResearchOJ.deleteAsset(this.currentId)
			.toPromise()
			.then(() => {
				this.errorMessage = null;
			})
			.catch((error) => {
				if (error == 'Server error') {
					this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
				}
				else if (error == '404 - Not Found') {
					this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
				}
				else {
					this.errorMessage = error;
				}
			});
	}

	setId(id: any): void {
		this.currentId = id;
	}

	getForm(id: any): Promise<any> {

		return this.serviceResearchOJ.getAsset(id)
			.toPromise()
			.then((result) => {
				this.errorMessage = null;
				let formObject = {


					'ROId': null,


					'typero': null,


					'address': null,


					'reward': null,


					'cost': null,


					'owner': null,


					'contributor': null


				};


				if (result.ROId) {

					formObject.ROId = result.ROId;

				} else {
					formObject.ROId = null;
				}

				if (result.typero) {

					formObject.typero = result.typero;

				} else {
					formObject.typero = null;
				}

				if (result.address) {

					formObject.address = result.address;

				} else {
					formObject.address = null;
				}

				if (result.reward) {

					formObject.reward = result.reward;

				} else {
					formObject.reward = null;
				}

				if (result.cost) {

					formObject.cost = result.cost;

				} else {
					formObject.cost = null;
				}

				if (result.owner) {

					formObject.owner = result.owner;

				} else {
					formObject.owner = null;
				}

				if (result.contributor) {

					formObject.contributor = result.contributor;

				} else {
					formObject.contributor = null;
				}


				this.myForm.setValue(formObject);

			})
			.catch((error) => {
				if (error == 'Server error') {
					this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
				}
				else if (error == '404 - Not Found') {
					this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
				}
				else {
					this.errorMessage = error;
				}
			});

	}

	resetForm(): void {
		this.myForm.setValue({


			'ROId': null,


			'typero': null,


			'address': null,


			'reward': null,


			'cost': null,


			'owner': null,


			'contributor': null


		});
	}

}
