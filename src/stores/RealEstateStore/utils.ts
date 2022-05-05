import { TransactionData } from '@/mockAPI';
import { StateKey } from '@/types/address';
// import { RealEstateStoreType } from '.';
import stateDictionary from '@/data/states.json';
import RealEstateStore from '.';

type Range = UTILS.Range;

export type StatesObject = { name: string; key: StateKey };

export interface TransactionFilters {
  states: StatesObject[];
  cities: string[];
  address: string;
  price: Range;
  rooms: Range;
}

export type TransactionFilterSetters = ReturnType<typeof getSetters>;

export interface TransactionFiltersWithSetters extends TransactionFilters {
  set: TransactionFilterSetters;
}

export interface TransactionFilterOptions {
  states: StatesObject[];
  cities: string[];
  addresses: string[];
  rooms: number[];
}

export enum RealEstateSorting {
  ADDRESS = 'Address',
  PRICE_LOW_TO_HIGH = 'Price - low to high',
  PRICE_HIGH_TO_LOW = 'Price - high to low',
  SIZE_LARGE_TO_SMALL = 'Size - larger to smaller',
  SIZE_SMALL_TO_LARGE = 'Size - smaller to larger'
}
export type SortingOption =
  | 'Address'
  | 'Price - low to high'
  | 'Price - high to low'
  | 'Size - larger to smaller'
  | 'Size - smaller to larger';
export type SortingMethods = { [key in SortingOption]: (a: TransactionData, b: TransactionData) => number };

export const realEstateSortingOptions: SortingOption[] = [
  'Address',
  'Price - low to high',
  'Price - high to low',
  'Size - larger to smaller',
  'Size - smaller to larger'
];

export const realEstateSortingMethods: SortingMethods = {
  [RealEstateSorting.ADDRESS]: (a, b) => {
    const addressNumberRegex = /^\s*[0-9]+\s*/g;
    const addressA = a.address.address.replace(addressNumberRegex, '').toLowerCase();
    const addressB = b.address.address.replace(addressNumberRegex, '').toLowerCase();
    if (addressA < addressB) {
      return -1;
    }
    if (addressA > addressB) {
      return 1;
    }
    return 0;
  },
  [RealEstateSorting.PRICE_LOW_TO_HIGH]: (a, b) => a.price - b.price,
  [RealEstateSorting.PRICE_HIGH_TO_LOW]: (a, b) => b.price - a.price,
  [RealEstateSorting.SIZE_LARGE_TO_SMALL]: (a, b) => b.sqm - a.sqm,
  [RealEstateSorting.SIZE_SMALL_TO_LARGE]: (a, b) => a.sqm - b.sqm
};

export interface RealEstateSortingIndexes {
  0: RealEstateSorting.ADDRESS;
  1: RealEstateSorting.PRICE_LOW_TO_HIGH;
  2: RealEstateSorting.PRICE_HIGH_TO_LOW;
  3: RealEstateSorting.SIZE_LARGE_TO_SMALL;
  4: RealEstateSorting.SIZE_SMALL_TO_LARGE;
}

export const realEstateSortingIndexes: RealEstateSortingIndexes = {
  0: RealEstateSorting.ADDRESS,
  1: RealEstateSorting.PRICE_LOW_TO_HIGH,
  2: RealEstateSorting.PRICE_HIGH_TO_LOW,
  3: RealEstateSorting.SIZE_LARGE_TO_SMALL,
  4: RealEstateSorting.SIZE_SMALL_TO_LARGE
};

export function getSetters(this: RealEstateStore) {
  const obj = {
    states: this.getFilterSetter('states'),
    cities: this.getFilterSetter('cities'),
    address: this.getFilterSetter('address'),
    price: this.getFilterSetter('price'),
    rooms: this.getFilterSetter('rooms')
  };
  return obj;
}

export function handleMinMaxPrice(this: RealEstateStore) {
  const { min, max } = this.filters.price;
  const { max: highestPrice, min: lowestPrice } = this.getNumericDataRangeUnfiltered('price');
  if (min < lowestPrice) {
    this._filters.price = { min: lowestPrice, max };
  }
  if (max > highestPrice || max < lowestPrice) {
    this._filters.price = { min: this._filters.price.min, max: highestPrice };
  }
}

export function handleMinMaxRooms(this: RealEstateStore) {
  const { min, max } = this.filters.rooms;
  const { min: minRooms, max: maxRooms } = this.getNumericDataRangeUnfiltered('num_rooms');
  if (min < minRooms) {
    this._filters.rooms = { min: minRooms, max };
  }
  if (max > maxRooms || max < minRooms) {
    this._filters.rooms = { min: this.filters.rooms.min, max: maxRooms };
  }
}

export function reduceObjArrNumPropToRange<T extends UTILS.GenericObject>(
  array: T[],
  key: keyof UTILS.PickByType<T, number>
) {
  return array.reduce(
    (prev, curr) => {
      if (curr[key]! > prev.max) {
        return { max: curr[key], min: prev.min };
      }
      if (!prev.min || curr[key]! < prev.min) {
        return { max: prev.max, min: curr[key] };
      }
      return prev;
    },
    { max: 0, min: 0 }
  );
}

export function reduceTransactionDataToOptions(array: TransactionData[], filters: TransactionFilters) {
  const options = array.reduce<TransactionFilterOptions>(
    (prev, curr) => {
      const states = [...prev.states];
      const cities = [...prev.cities];
      const addresses = [...prev.addresses];
      const rooms = [...prev.rooms];
      const notInStates = !prev.states.find(s => s.key === curr.address.state);
      const isInStatesOrStatesEmpty =
        !filters.states.length || filters.states.findIndex(s => s.key === curr.address.state) !== -1;
      const notInCities = cities.indexOf(curr.address.city) === -1;
      const isInCitiesOrCitiesEmpty = !filters.cities.length || filters.cities.indexOf(curr.address.city) !== -1;
      const notInRooms = rooms.indexOf(curr.num_rooms) === -1;
      const isSameAddressesOrAddressEmpty = !filters.address.length || filters.address === curr.address.address;

      if (notInStates) {
        states.push({ key: curr.address.state, name: stateDictionary[curr.address.state] });
      }
      if (notInCities && isInStatesOrStatesEmpty) {
        cities.push(curr.address.city);
      }
      if (isInCitiesOrCitiesEmpty && isInStatesOrStatesEmpty) {
        addresses.push(curr.address.address);
      }
      if (notInRooms && isInCitiesOrCitiesEmpty && isInStatesOrStatesEmpty && isSameAddressesOrAddressEmpty) {
        rooms.push(curr.num_rooms);
      }

      return {
        states,
        cities,
        addresses,
        rooms
      };
    },
    { states: [], cities: [], addresses: [], rooms: [] }
  );
  options.rooms.sort();
  return options;
}
