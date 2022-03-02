import transactions from './transactions.json';
import image1 from '/images/prop1.jpg';
import image2 from '/images/prop2.jpg';
import image3 from '/images/prop3.jpg';
import image4 from '/images/prop4.jpg';
import image5 from '/images/prop5.jpg';
import placeholder from '/images/placeholder.jpg';

const images = [image1, image2, image3, image4, image5, placeholder];

const getRandomImage = () => {
  const index = Math.floor(Math.random() * images.length);
  return images[index];
};

export type ParkingType = 'single' | 'double' | 'without' | null;

export interface TransactionData {
  price: number | string;
  sqm: number | string;
  num_rooms: number | string;
  floor: number | string;
  num_floors: number | string;
  elevator: 0;
  parking: ParkingType;
  image: string;
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
      transactions.properties.map(p => ({ ...p, image: getRandomImage() })) as TransactionData[]
    );
  }
}

export default MockAPI;
