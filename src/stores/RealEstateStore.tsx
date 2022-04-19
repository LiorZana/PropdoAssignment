import { TransactionData } from '@/mockAPI';

class RealEstateStore {
  public transactions: TransactionData[] = [];
}

const realEstateStore = new RealEstateStore();

export default realEstateStore;
