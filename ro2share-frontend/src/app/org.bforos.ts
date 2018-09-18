import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.bforos{
   export enum TypeRO {
      DOCUMENT,
      CODE,
      IMAGE,
      DATASET,
      PRESENTATION,
      DICOM,
      TECH_SUPP,
      OTHER,
   }
   export class ResearchOJ extends Asset {
      ROId: string;
      typero: TypeRO;
      uri: string;
      reward: number;
      cost: number;
      creation: Date;
      owner: Researcher;
      contributors: Researcher[];
   }
   export class Disco extends Asset {
      DiscoId: string;
      Robjs: ResearchOJ[];
      owner: Researcher;
   }
   export class Researcher extends Participant {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      creation: Date;
      wallet: number;
   }
   export class Institution extends Participant {
      InsId: string;
      InsName: string;
      budget: number;
      members: Researcher[];
   }
   export class Claim extends Transaction {
      Ro: ResearchOJ;
      claimer: Researcher;
   }
   export class WalletEvent extends Event {
      claimer: Researcher;
      oldbalance: number;
      newbalance: number;
   }
   export class Collect extends Transaction {
      Ro: ResearchOJ;
      claimer: Researcher;
   }
   export class Enrich extends Transaction {
      Ro: ResearchOJ;
      contributor: Researcher;
   }
   export class ResearchOJHistory extends Transaction {
      ROId: string;
   }
   export class ResearchOJHistoryResults extends Event {
      results: string[];
   }
// }
