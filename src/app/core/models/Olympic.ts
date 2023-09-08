import { Participation } from './Participation';

//This model takes care of one country
export class Olympic {
  id!: number;
  country!: string;
  participations!: Array<Participation>;
}
