import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.bforos{
   export enum TypeRO {
      document,
      code,
      image,
      dataset,
      presentation,
      dicom,
      tech_supp,
      other,
   }
   export class ResearchOJ extends Asset {
      ROId: string;
      typero: TypeRO;
      address: string;
      reward: number;
      cost: number;
      owner: Researcher;
      contributor: Researcher;
   }
   export class Researcher extends Participant {
      email: string;
      firstName: string;
      lastNam: string;
      wallet: number;
   }
   export class Institution extends Participant {
      InsId: string;
      InsName: string;
      budget: number;
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
// }
