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
import {InstitutionService} from './Institution.service';
// import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-institution',
	templateUrl: './Institution.component.html',
	styleUrls: ['./Institution.component.css'],
	providers: [InstitutionService]
})
export class InstitutionComponent implements OnInit {

	myForm: FormGroup;

	private allParticipants;
	private participant;
	private currentId;
	private errorMessage;


	InsId = new FormControl('', Validators.required);


	InsName = new FormControl('', Validators.required);


	budget = new FormControl('', Validators.required);


	constructor(private serviceInstitution: InstitutionService, fb: FormBuilder) {
		this.myForm = fb.group({


			InsId: this.InsId,


			InsName: this.InsName,


			budget: this.budget


		});
	};

	ngOnInit(): void {
		this.loadAll();
	}

	loadAll(): Promise<any> {
		let tempList = [];
		return this.serviceInstitution.getAll()
			.toPromise()
			.then((result) => {
				this.errorMessage = null;
				result.forEach(participant => {
					tempList.push(participant);
				});
				this.allParticipants = tempList;
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

	addParticipant(form: any): Promise<any> {
		this.participant = {
			$class: 'org.bforos.Institution',


			'InsId': this.InsId.value,


			'InsName': this.InsName.value,


			'budget': this.budget.value


		};

		this.myForm.setValue({


			'InsId': null,


			'InsName': null,


			'budget': null


		});

		return this.serviceInstitution.addParticipant(this.participant)
			.toPromise()
			.then(() => {
				this.errorMessage = null;
				this.myForm.setValue({


					'InsId': null,


					'InsName': null,


					'budget': null


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


	updateParticipant(form: any): Promise<any> {
		this.participant = {
			$class: 'org.bforos.Institution',


			'InsName': this.InsName.value,


			'budget': this.budget.value


		};

		return this.serviceInstitution.updateParticipant(form.get('InsId').value, this.participant)
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


	deleteParticipant(): Promise<any> {

		return this.serviceInstitution.deleteParticipant(this.currentId)
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

		return this.serviceInstitution.getparticipant(id)
			.toPromise()
			.then((result) => {
				this.errorMessage = null;
				let formObject = {


					'InsId': null,


					'InsName': null,


					'budget': null


				};


				if (result.InsId) {

					formObject.InsId = result.InsId;

				} else {
					formObject.InsId = null;
				}

				if (result.InsName) {

					formObject.InsName = result.InsName;

				} else {
					formObject.InsName = null;
				}

				if (result.budget) {

					formObject.budget = result.budget;

				} else {
					formObject.budget = null;
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


			'InsId': null,


			'InsName': null,


			'budget': null


		});
	}

}
