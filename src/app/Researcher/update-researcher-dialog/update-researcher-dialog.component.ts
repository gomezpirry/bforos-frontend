import {Component, Inject, OnInit} from '@angular/core';
import {CreateResearcherDialogComponent} from '../create-researcher-dialog/create-researcher-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TdLoadingService} from '@covalent/core';
import {ResearcherService} from '../Researcher.service';

@Component({
  selector: 'app-update-researcher-dialog',
  templateUrl: './update-researcher-dialog.component.html',
  styleUrls: ['./update-researcher-dialog.component.css'],
	providers: [ResearcherService]
})
export class UpdateResearcherDialogComponent implements OnInit {

	myForm: FormGroup;
	errorMessage: String;
	id: any;

	private participant;

	email = new FormControl({ value: null, readonly: true });
	firstName = new FormControl(null, Validators.required);
	lastName = new FormControl(null, Validators.required);
	wallet = new FormControl(null, [ Validators.required, Validators.min(0) ]);

	constructor(private serviceResearcher: ResearcherService,
							private loadingService: TdLoadingService,
							public fb: FormBuilder,
							public dialogRef: MatDialogRef<UpdateResearcherDialogComponent>,
							@Inject(MAT_DIALOG_DATA) public data: any) {
		this.myForm = fb.group({
			email: this.email,
			firstName: this.firstName,
			lastName: this.lastName,
			wallet: this.wallet
		});

		this.id = data.id;
	};

	ngOnInit() {
		this.getForm();
	}

	getForm(): void {
		this.serviceResearcher.getparticipant(this.id).subscribe(
			(result) => {
				this.errorMessage = null;
				const formObject = {
					'email': null,
					'firstName': null,
					'lastNam': null,
					'wallet': null
				};

				if (result.email) {
					formObject.email = result.email;
				} else {
					formObject.email = null;
				}

				if (result.firstName) {
					formObject.firstName = result.firstName;
				} else {
					formObject.firstName = null;
				}

				if (result.lastName) {
					formObject.lastNam = result.lastName;
				} else {
					formObject.lastNam = null;
				}

				if (result.wallet) {
					formObject.wallet = result.wallet;
				} else {
					formObject.wallet = null;
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

	updateParticipant(): void {
		this.participant = {
			$class: 'org.bforos.Researcher',
			'firstName': this.firstName.value,
			'lastName': this.lastName.value,
			'wallet': this.wallet.value
		};

		this.registerLoading();
		this.serviceResearcher.updateParticipant(this.email.value, this.participant).subscribe(
			() => {
				this.errorMessage = null;
				this.resolveLoading();
				this.closeDialog({ update: true });
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

	closeDialog(data = { update: false }): void {
		this.dialogRef.close(data);
	}

	registerLoading(): void {
		this.loadingService.register('update');
	}

	resolveLoading(): void {
		this.loadingService.resolve('update');
	}
}
