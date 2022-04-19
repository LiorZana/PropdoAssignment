import stateDictionary from '@/data/states.json';

export type StateDictionary = typeof stateDictionary;
export type StateKey = keyof StateDictionary;

export interface AddressObjectBase {
  city: string;
  state: StateKey;
  postalCode: string;
  coordinates: { lat: number; lng: number };
}

export interface AddressObject extends AddressObjectBase {
  address: string;
}
