import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TdLoadingService} from '@covalent/core';
import {FormBuilder} from '@angular/forms';
import {ResearcherService} from '../Researcher.service';

@Component({
  selector: 'app-delete-researcher-dialog',
  templateUrl: './delete-researcher-dialog.component.html',
  styleUrls: ['./delete-researcher-dialog.component.css'],
	providers: [ResearcherService]
})
export class DeleteResearcherDialogComponent implements OnInit {

	errorMessage: String;
	id: any;

	constructor(private serviceResearcher: ResearcherService,
							private loadingService: TdLoadingService,
							public dialogRef: MatDialogRef<DeleteResearcherDialogComponent>,
							@Inject(MAT_DIALOG_DATA) public data: any) {

		this.id = data.id;
	};

  ngOnInit() {
  }

	deleteParticipant(): void {
  	this.registerLoading();
		this.serviceResearcher.deleteParticipant(this.id).subscribe(
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
		this.loadingService.register('delete');
	}

	resolveLoading(): void {
		this.loadingService.resolve('delete');
	}
}
