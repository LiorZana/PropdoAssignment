import { AddressObject } from '@/types/address';
import { getRandomInt, getRandomIntInRange, stringOrNumberToNumber } from '@/utils';
import transactions from '@/data/transactions.json';
import image1 from '/images/prop1.jpg';
import image2 from '/images/prop2.jpg';
import image3 from '/images/prop3.jpg';
import image4 from '/images/prop4.jpg';
import image5 from '/images/prop5.jpg';
// import placeholder from '/images/placeholder.jpg';

const images = [image1, image2, image3, image4, image5];

const getRandomImages = (amount: number) => {
  const currImages: string[] = [];
  for (let i = 0; i < amount; i++) {
    let index = getRandomInt(images.length);
    let retries = 0;
    while (images.includes(images[index]) && retries < 20) {
      index = getRandomInt(images.length);
      retries++;
    }
    currImages.push(images[index]);
  }
  return currImages;
};

export type ParkingType = 'single' | 'double' | 'without' | null;

export interface TransactionData {
  price: number;
  sqm: number;
  num_rooms: number;
  floor: number;
  num_floors: number;
  elevator: number;
  parking: ParkingType;
  address: AddressObject;
  images: string[];
  id: string;
}

class MockAPI {
  private static promisifiy<T>(data: T, delay = 1000, shouldReject = false) {
    return new Promise<T>((resolve, reject) => {
      setTimeout(() => (shouldReject ? reject('Error!') : resolve(data)), delay);
    });
  }

  static fetch() {
    return MockAPI.promisifiy(
      transactions.properties.map(p => ({
        ...p,
        price: stringOrNumberToNumber(p.price),
        sqm: stringOrNumberToNumber(p.sqm),
        elevator: stringOrNumberToNumber(p.elevator),
        floor: stringOrNumberToNumber(p.floor),
        num_rooms: stringOrNumberToNumber(p.num_rooms),
        num_floors: stringOrNumberToNumber(p.num_floors),
        images: getRandomImages(getRandomIntInRange(2, 4, true))
      })) as TransactionData[]
    );
  }
}

export default MockAPI;
