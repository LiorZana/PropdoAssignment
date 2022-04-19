import { TransactionData } from '@/mockAPI';
import { observable, makeAutoObservable, makeObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { ViewState } from 'react-map-gl';

class ListingTabsStore {
  public transactionData: TransactionData = {
    price: 1949826,
    sqm: 145,
    num_rooms: 6,
    floor: 2,
    num_floors: 3,
    elevator: 0,
    parking: null,
    id: '',
    address: {
      address: '',
      city: '',
      state: 'AK',
      postalCode: '',
      coordinates: { lat: 0, lng: 0 }
    },
    images: []
  };
  public currentTab = 0;
  public viewState: ViewState = {
    bearing: 0,
    latitude: 0,
    longitude: 0,
    padding: { top: 0, left: 0, right: 0, bottom: 0 },
    pitch: 0,
    zoom: 0
  };
  constructor() {
    makeAutoObservable(this);
  }
}

const listingTabsStore = new ListingTabsStore();

export type ListingTabsStoreType = InstanceType<new () => ListingTabsStore>;
export default listingTabsStore;
