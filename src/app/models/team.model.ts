export interface Team {
  id: number;
  name?: string;
  champions: Champion[];
}

export interface Champion {
  id: number;
  name: string;
  faction: string;
  portrait: string;
  rarity: string;
  element: string;
}
