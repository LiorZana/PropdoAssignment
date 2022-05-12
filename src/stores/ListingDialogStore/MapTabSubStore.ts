import { getAddressLabel } from '@/views/RealEstate/utils';
import { makeAutoObservable } from 'mobx';
import { ViewState } from 'react-map-gl';
import ListingDialogStore from '.';

class MapTabSubStore {
  private _viewState: ViewState = {
    longitude: 0,
    latitude: 0,
    zoom: 10,
    bearing: 0,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
    pitch: 0
  };
  private _popupOpen: boolean = false;

  public togglePopup() {
    this._popupOpen = !this.popupOpen;
  }
  public get popupOpen() {
    return this._popupOpen;
  }

  public get viewState() {
    return this._viewState;
  }
  public set viewState(value: ViewState) {
    this._viewState = value;
  }

  public get currentData() {
    return this.listingDialogStore.currentData;
  }
  public get addressLabel() {
    if (this.currentData) return getAddressLabel(this.currentData.address);
    return '';
  }
  public get addressCoords(): Pick<ViewState, 'longitude' | 'latitude'> {
    const coords = this.currentData?.address.coordinates;
    if (coords) {
      return { longitude: coords.lng, latitude: coords.lat };
    }
    return { longitude: 0, latitude: 0 };
  }
  constructor(public listingDialogStore: ListingDialogStore) {
    makeAutoObservable(this);
    this.togglePopup = this.togglePopup.bind(this);
  }
}

export default MapTabSubStore;
