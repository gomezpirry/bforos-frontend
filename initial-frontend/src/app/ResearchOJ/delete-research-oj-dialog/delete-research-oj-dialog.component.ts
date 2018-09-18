import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ResearchOJService} from '../ResearchOJ.service';
import {TdLoadingService} from '@covalent/core';

@Component({
  selector: 'app-delete-research-oj-dialog',
  templateUrl: './delete-research-oj-dialog.component.html',
  styleUrls: ['./delete-research-oj-dialog.component.css'],
	providers: [ResearchOJService]
})
export class DeleteResearchOJDialogComponent implements OnInit {

	errorMessage: String;
	id: any;

	constructor(private serviceResearchOJ: ResearchOJService,
							private loadingService: TdLoadingService,
							public dialogRef: MatDialogRef<DeleteResearchOJDialogComponent>,
							@Inject(MAT_DIALOG_DATA) public data: any) {
		this.id = data.id;
	}

	ngOnInit() { }

	deleteAsset(): void {
		this.registerLoading();
		this.serviceResearchOJ.deleteAsset(this.id).subscribe(
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
