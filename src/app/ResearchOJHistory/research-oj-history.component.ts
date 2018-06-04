import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClaimService} from '../Claim/Claim.service';
import {TdLoadingService} from '@covalent/core';
import {ResearchOJHistoryService} from './research-o-j-history.service';

@Component({
  selector: 'app-research-oj-history',
  templateUrl: './research-oj-history.component.html',
  styleUrls: ['./research-oj-history.component.css']
})
export class ResearchOJHistoryComponent implements OnInit {

	myForm: FormGroup;
	errorMessage: String;
	successMessage: String;

	private Transaction;

	ROId = new FormControl(null, Validators.required);
	// transactionId = new FormControl('', Validators.required);
	// timestamp = new FormControl('', Validators.required);

	currentROId: string;
	history = [];

	constructor(private serviceResearchOJHistory: ResearchOJHistoryService,
							private loadingService: TdLoadingService,
							public fb: FormBuilder) {
		this.myForm = fb.group({
			ROId: this.ROId,
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
				$class: 'org.bforos.ResearchOJHistory',
				'ROId': this.ROId.value,
				// 'transactionId': this.transactionId.value,
				// 'timestamp': this.timestamp.value
			};

			this.registerLoading();
			this.serviceResearchOJHistory.requestResearchOJHistory(this.Transaction).subscribe(
				(data) => {
					console.log(data);
					this.serviceResearchOJHistory.getResearchOJHistory(data.transactionId).subscribe(
						async (results) => {
							this.errorMessage = null;
							this.myForm.reset();
							// this.successMessage = ' Transaction ' + '' + ' submitted successfully.';
							console.log(results);
							results = results[0].eventsEmitted[0].results;
							for (let i = 0; i < results.length; i++) {
								const result = JSON.parse(results[i]);
								const record = {
									historianRecord: await this.serviceResearchOJHistory.getHistorianRecord(result.tx_id),
									value: JSON.parse(result.value)
								};
								this.history.push(record);
							}
							console.log(this.history);
							this.currentROId = this.Transaction.ROId;
							this.resolveLoading();
						},
						(error) => {
							if (error === 'Server error') {
								this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
							} else {
								this.errorMessage = error;
							}
							this.resolveLoading();
						}
					);
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

	parseAssetState(asset: any): string {
		return JSON.stringify(asset);
	}

	registerLoading(): void {
		this.loadingService.register('loading');
	}

	resolveLoading(): void {
		this.loadingService.resolve('loading');
	}

}
