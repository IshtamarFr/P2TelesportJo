import { Participation } from './Participation';

//This model takes care of one Olympic Games occurence : eg Paris 2024
export class Olympic {
  id!: number;
  country!: string;
  participations!: Array<Participation>;
}
