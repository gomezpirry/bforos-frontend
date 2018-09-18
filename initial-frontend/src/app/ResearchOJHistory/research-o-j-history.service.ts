import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {DataService} from '../data.service';
import {ResearchOJHistory} from '../org.bforos';
import {HistorianRecord} from '../org.hyperledger.composer.system';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResearchOJHistoryService {

  constructor(private dataService: DataService<ResearchOJHistory>,
							private historianSevice: DataService<HistorianRecord>) { }

	requestResearchOJHistory(itemToAdd: any): Observable<ResearchOJHistory> {
		return this.dataService.add('ResearchOJHistory', itemToAdd);
	}

	getResearchOJHistory(ROId: string): Observable<any[]> {
  	return this.dataService.history('selectHistorianRecordsByTrxId', ROId);
	}

	getHistorianRecord(transactionId: string): Promise<HistorianRecord> {
  	return this.historianSevice.getSingle('system/historian', transactionId)
			.pipe(
				take(1)
			)
			.toPromise();
	}
}
