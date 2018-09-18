import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TdLoadingService} from '@covalent/core';
import {ResearchOJService} from '../ResearchOJ.service';

@Component({
  selector: 'app-update-research-oj-dialog',
  templateUrl: './update-research-oj-dialog.component.html',
  styleUrls: ['./update-research-oj-dialog.component.css'],
	providers: [ResearchOJService]
})
export class UpdateResearchOJDialogComponent implements OnInit {

	myForm: FormGroup;
	errorMessage: String;
	id: any;

	private asset;

	ROId = new FormControl({ value: null, readonly: true });
	typero = new FormControl(null, Validators.required);
	address = new FormControl(null, Validators.required);
	reward = new FormControl(null, [ Validators.required, Validators.min(0) ]);
	cost = new FormControl(null, [ Validators.required, Validators.min(0) ]);
	owner = new FormControl(null, Validators.email);
	contributor = new FormControl(null, Validators.email);

	objectTypes = [
		{
			name: 'Document',
			value: 'document'
		},
		{
			name: 'Code',
			value: 'code'
		},
		{
			name: 'Image',
			value: 'image'
		},
		{
			name: 'Dataset',
			value: 'dataset'
		},
		{
			name: 'Presentation',
			value: 'presentation'
		},
		{
			name: 'Dicom',
			value: 'dicom'
		},
		{
			name: 'Tech Support',
			value: 'tech_supp'
		},
		{
			name: 'Other',
			value: 'other'
		}
	];

	constructor(private serviceResearchOJ: ResearchOJService,
							private loadingService: TdLoadingService,
							@Inject(FormBuilder) fb: FormBuilder,
							public dialogRef: MatDialogRef<UpdateResearchOJDialogComponent>,
							@Inject(MAT_DIALOG_DATA) public data: any) {
		this.myForm = fb.group({
			ROId: this.ROId,
			typero: this.typero,
			address: this.address,
			reward: this.reward,
			cost: this.cost,
			owner: this.owner,
			contributor: this.contributor
		});

		this.id = data.id;
	}

	ngOnInit() {
		// this.myForm.reset();
		this.getForm();
	}

	getForm(): void {
		this.serviceResearchOJ.getAsset(this.id).subscribe(
			(result) => {
				this.errorMessage = null;
				const formObject = {
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
					formObject.owner = this.parseHyperledgerID(result.owner);
					console.log();
				} else {
					formObject.owner = null;
				}

				if (result.contributor) {
					formObject.contributor = result.contributor;
				} else {
					formObject.contributor = null;
				}

				this.myForm.setValue(formObject);
			},
			(error) => {
				if (error === 'Server error') {
					this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
				}	else if (error === '404 - Not Found') {
					this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
				}	else {
					this.errorMessage = error;
				}
			});
	}

	updateAsset(): void {
		if (this.myForm.valid) {
			this.asset = {
				$class: 'org.bforos.ResearchOJ',
				'typero': this.typero.value,
				'address': this.address.value,
				'reward': this.reward.value,
				'cost': this.cost.value,
				// 'owner': this.owner.value,
				// 'contributor': this.contributor.value
			};

			if (this.owner.value && this.owner.value.length === 0) {
				this.owner.setValue(null);
			}
			if (this.contributor.value && this.contributor.value.length === 0) {
				this.contributor.setValue(null);
			}

			this.registerLoading();
			this.serviceResearchOJ.updateAsset(this.id, this.asset).subscribe(
				() => {
					this.errorMessage = null;
					this.resolveLoading();
					this.closeDialog({update: true});
				},
				(error) => {
					if (error === 'Server error') {
						this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
					} else if (error === '404 - Not Found') {
						this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
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

	closeDialog(data = { update: false }): void {
		this.dialogRef.close(data);
	}

	parseHyperledgerID(value: any): String {
		if (value) {
			value = value.split('#')[1];
		}
		return value;
	}

	registerLoading(): void {
		this.loadingService.register('update');
	}

	resolveLoading(): void {
		this.loadingService.resolve('update');
	}

}
