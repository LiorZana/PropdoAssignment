import { makeAutoObservable } from 'mobx';
import RealEstateStore from './RealEstateStore';
import ListingDialogStore, { listingDialogStoreReactions } from './ListingDialogStore';
import UIStore from './UIStore';
import { Theme } from '@mui/material';

class RootStore {
  private _realEstateStore: RealEstateStore;
  private _listingDialogStore: ListingDialogStore;
  private _uiStore: UIStore;
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
    this._uiStore = new UIStore();
  }
  public set theme(theme: Theme) {
    this._uiStore.setTheme(theme);
  }
}
const rootStore = new RootStore();
listingDialogStoreReactions(rootStore.listingDialogStore);
export type RootStoreType = InstanceType<typeof RootStore>;
export default rootStore;
