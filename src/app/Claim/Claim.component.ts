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
import {ClaimService} from './Claim.service';
// import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-claim',
	templateUrl: './Claim.component.html',
	styleUrls: ['./Claim.component.css'],
	providers: [ClaimService]
})
export class ClaimComponent implements OnInit {

	myForm: FormGroup;

	private allTransactions;
	private Transaction;
	private currentId;
	private errorMessage;

	Ro = new FormControl('', Validators.required);
	claimer = new FormControl('', Validators.required);
	transactionId = new FormControl('', Validators.required);
	timestamp = new FormControl('', Validators.required);

	constructor(private serviceClaim: ClaimService, fb: FormBuilder) {
		this.myForm = fb.group({
			Ro: this.Ro,
			claimer: this.claimer,
			transactionId: this.transactionId,
			timestamp: this.timestamp
		});
	};

	ngOnInit(): void {
		this.loadAll();
	}

	loadAll(): Promise<any> {
		const tempList = [];
		return this.serviceClaim.getAll()
			.toPromise()
			.then((result) => {
				this.errorMessage = null;
				result.forEach(transaction => {
					tempList.push(transaction);
				});
				this.allTransactions = tempList;
			})
			.catch((error) => {
				if (error === 'Server error') {
					this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
				} else if (error === '404 - Not Found') {
					this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
				} else {
					this.errorMessage = error;
				}
			});
	}

	/**
	 * Event handler for changing the checked state of a checkbox (handles array enumeration values)
	 * @param {String} name - the name of the transaction field to update
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
	 * only). This is used for checkboxes in the transaction updateDialog.
	 * @param {String} name - the name of the transaction field to check
	 * @param {any} value - the enumeration value to check for
	 * @return {Boolean} whether the specified transaction field contains the provided value
	 */
	hasArrayValue(name: string, value: any): boolean {
		return this[name].value.indexOf(value) !== -1;
	}

	addTransaction(form: any): Promise<any> {
		this.Transaction = {
			$class: 'org.bforos.Claim',
			'Ro': this.Ro.value,
			'claimer': this.claimer.value,
			'transactionId': this.transactionId.value,
			'timestamp': this.timestamp.value
		};

		this.myForm.setValue({
			'Ro': null,
			'claimer': null,
			'transactionId': null,
			'timestamp': null
		});

		return this.serviceClaim.addTransaction(this.Transaction)
			.toPromise()
			.then(() => {
				this.errorMessage = null;
				this.myForm.setValue({
					'Ro': null,
					'claimer': null,
					'transactionId': null,
					'timestamp': null
				});
			})
			.catch((error) => {
				if (error === 'Server error') {
					this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
				} else {
					this.errorMessage = error;
				}
			});
	}

	updateTransaction(form: any): Promise<any> {
		this.Transaction = {
			$class: 'org.bforos.Claim',
			'Ro': this.Ro.value,
			'claimer': this.claimer.value,
			'timestamp': this.timestamp.value
		};

		return this.serviceClaim.updateTransaction(form.get('transactionId').value, this.Transaction)
			.toPromise()
			.then(() => {
				this.errorMessage = null;
			})
			.catch((error) => {
				if (error === 'Server error') {
					this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
				}	else if (error === '404 - Not Found') {
					this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
				}	else {
					this.errorMessage = error;
				}
			});
	}

	deleteTransaction(): Promise<any> {
		return this.serviceClaim.deleteTransaction(this.currentId)
			.toPromise()
			.then(() => {
				this.errorMessage = null;
			})
			.catch((error) => {
				if (error === 'Server error') {
					this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
				}	else if (error === '404 - Not Found') {
					this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
				}	else {
					this.errorMessage = error;
				}
			});
	}

	setId(id: any): void {
		this.currentId = id;
	}

	getForm(id: any): Promise<any> {
		return this.serviceClaim.getTransaction(id)
			.toPromise()
			.then((result) => {
				this.errorMessage = null;
				const formObject = {
					'Ro': null,
					'claimer': null,
					'transactionId': null,
					'timestamp': null
				};

				if (result.Ro) {
					formObject.Ro = result.Ro;
				} else {
					formObject.Ro = null;
				}

				if (result.claimer) {
					formObject.claimer = result.claimer;
				} else {
					formObject.claimer = null;
				}

				if (result.transactionId) {
					formObject.transactionId = result.transactionId;
				} else {
					formObject.transactionId = null;
				}

				if (result.timestamp) {
					formObject.timestamp = result.timestamp;
				} else {
					formObject.timestamp = null;
				}

				this.myForm.setValue(formObject);

			})
			.catch((error) => {
				if (error === 'Server error') {
					this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
				}	else if (error === '404 - Not Found') {
					this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
				}	else {
					this.errorMessage = error;
				}
			});
	}

	resetForm(): void {
		this.myForm.setValue({
			'Ro': null,
			'claimer': null,
			'transactionId': null,
			'timestamp': null
		});
	}

}

