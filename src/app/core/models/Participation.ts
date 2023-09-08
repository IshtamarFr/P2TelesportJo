//This model takes care of one country performances : eg UK team during Paris 2024 Olympics
export class Participation {
  id!: number;
  year!: number;
  city!: string;
  medalsCount!: number;
  athleteCount!: number;
}
