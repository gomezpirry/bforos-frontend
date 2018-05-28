import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResearchOJService} from '../ResearchOJ.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {TdLoadingService} from '@covalent/core';

@Component({
  selector: 'app-create-research-oj-dialog',
  templateUrl: './create-research-oj-dialog.component.html',
  styleUrls: ['./create-research-oj-dialog.component.css'],
	providers: [ResearchOJService]
})
export class CreateResearchOJDialogComponent implements OnInit {

	myForm: FormGroup;
	errorMessage: String;

	private asset;

	ROId = new FormControl(null, Validators.required);
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
							public dialogRef: MatDialogRef<CreateResearchOJDialogComponent>,
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
	}

  ngOnInit() {
		// this.myForm.reset();
	}

	addAsset(): void {
		if (this.myForm.valid) {
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
			// console.log(this.asset);
			// this.resetForm();
			this.registerLoading();
			this.serviceResearchOJ.addAsset(this.asset).subscribe(
				() => {
					this.errorMessage = null;
					this.myForm.reset();
					this.resolveLoading();
					this.closeDialog({ update: true });
				},
				(error) => {
					if (error === 'Server error') {
						this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
					} else {
						this.errorMessage = error as String;
					}
					this.resolveLoading()
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

	registerLoading(): void {
  	this.loadingService.register('create');
	}

	resolveLoading(): void {
  	this.loadingService.resolve('create');
	}
}

