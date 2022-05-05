import { makeAutoObservable } from 'mobx';
import RealEstateStore from './RealEstateStore';
import ListingDialogStore, { listingDialogStoreReactions } from './ListingDialogStore';

class RootStore {
  private _realEstateStore: RealEstateStore;
  private _listingDialogStore: ListingDialogStore;
  public get realEstateStore() {
    return this._realEstateStore;
  }
  public get listingDialogStore() {
    return this._listingDialogStore;
  }
  constructor() {
    makeAutoObservable(this);
    this._realEstateStore = new RealEstateStore();
    this._listingDialogStore = new ListingDialogStore(this._realEstateStore);
  }
}
const rootStore = new RootStore();
listingDialogStoreReactions(rootStore.listingDialogStore);
export type RootStoreType = InstanceType<typeof RootStore>;
export default rootStore;
