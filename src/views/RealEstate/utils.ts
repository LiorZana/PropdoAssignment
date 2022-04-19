import { TransactionData } from '@/mockAPI';
import { AddressObject } from '@/types/address';

export const getAddressLabel = (address: AddressObject) => `${address.address}, ${address.city}, ${address.state}`;

export type SortingOption = 'Address' | 'Price - low to high' | 'Price - high to low';
export type SortingMethods = { [key in SortingOption]: (a: TransactionData, b: TransactionData) => number };

export const sortingOptions: SortingOption[] = ['Address', 'Price - low to high', 'Price - high to low'];

export const sortingMethods: SortingMethods = {
  Address: (a, b) => {
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
  'Price - low to high': (a, b) => a.price - b.price,
  'Price - high to low': (a, b) => b.price - a.price
};

export const contactTabItemHeight = 240;
