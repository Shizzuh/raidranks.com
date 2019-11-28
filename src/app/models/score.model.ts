import { Team } from './team.model';

export interface Score {
  id: number;
  userName: string;
  clan: string;
  damage: number;
  category: string;
  difficulty?: string;
  time: number;
  imageUrl?: string;
  submissionDate?: Date;
  team?: Team;
}
