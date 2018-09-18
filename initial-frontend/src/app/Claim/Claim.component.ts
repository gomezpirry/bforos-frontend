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
import {TdLoadingService} from '@covalent/core';
// import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-claim',
	templateUrl: './Claim.component.html',
	styleUrls: ['./Claim.component.css'],
	providers: [ClaimService]
})
export class ClaimComponent implements OnInit {

	myForm: FormGroup;
	errorMessage: String;
	successMessage: String;

	private Transaction;

	Ro = new FormControl('', Validators.required);
	claimer = new FormControl('', Validators.required);
	// transactionId = new FormControl('', Validators.required);
	// timestamp = new FormControl('', Validators.required);

	constructor(private serviceClaim: ClaimService,
							private loadingService: TdLoadingService,
							public fb: FormBuilder) {
		this.myForm = fb.group({
			Ro: this.Ro,
			claimer: this.claimer,
			// transactionId: this.transactionId,
			// timestamp: this.timestamp
		});
	};

	ngOnInit(): void {	}

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

	submit(): void {
		this.successMessage = null;
		if (this.myForm.valid) {
			this.Transaction = {
				$class: 'org.bforos.Claim',
				'Ro': this.Ro.value,
				'claimer': this.claimer.value,
				// 'transactionId': this.transactionId.value,
				// 'timestamp': this.timestamp.value
			};

			this.registerLoading();
			this.serviceClaim.addTransaction(this.Transaction).subscribe(
				(result) => {
					this.errorMessage = null;
					this.myForm.reset();
					this.successMessage = ' Transaction ' + result.transactionId + ' submitted successfully.';
					this.resolveLoading();
				},
				(error) => {
					if (error === 'Server error') {
						this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
					} else {
						this.errorMessage = error;
					}
					this.resolveLoading();
				});
		} else {
			Object.keys(this.myForm.controls).forEach(field => {
				const control = this.myForm.get(field);
				control.markAsTouched({ onlySelf: true });
				// console.log(field, control.errors);
			});
		}
	}

	registerLoading(): void {
		this.loadingService.register('create');
	}

	resolveLoading(): void {
		this.loadingService.resolve('create');
	}
}

