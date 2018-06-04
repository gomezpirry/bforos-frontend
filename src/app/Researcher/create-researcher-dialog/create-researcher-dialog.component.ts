import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TdLoadingService} from '@covalent/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ResearcherService} from '../Researcher.service';

@Component({
  selector: 'app-create-researcher-dialog',
  templateUrl: './create-researcher-dialog.component.html',
  styleUrls: ['./create-researcher-dialog.component.css'],
	providers: [ResearcherService]
})
export class CreateResearcherDialogComponent implements OnInit {

	myForm: FormGroup;
	errorMessage: String;

	private participant;

	email = new FormControl(null, [ Validators.required, Validators.email ]);
	firstName = new FormControl(null, Validators.required);
	lastName = new FormControl(null, Validators.required);
	wallet = new FormControl(null, [ Validators.required, Validators.min(0) ]);

	constructor(private serviceResearcher: ResearcherService,
							private loadingService: TdLoadingService,
							public fb: FormBuilder,
							public dialogRef: MatDialogRef<CreateResearcherDialogComponent>) {
		this.myForm = fb.group({
			email: this.email,
			firstName: this.firstName,
			lastName: this.lastName,
			wallet: this.wallet
		});
	};

  ngOnInit() {
  }

	addParticipant(): void {
		if (this.myForm.valid) {
			this.participant = {
				$class: 'org.bforos.Researcher',
				'email': this.email.value,
				'firstName': this.firstName.value,
				'lastName': this.lastName.value,
				'wallet': this.wallet.value
			};

			this.registerLoading();
			this.serviceResearcher.addParticipant(this.participant).subscribe(
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

	registerLoading(): void {
		this.loadingService.register('create');
	}

	resolveLoading(): void {
		this.loadingService.resolve('create');
	}
}
