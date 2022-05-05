import { TransactionData } from '@/mockAPI';
import { ButtonProps } from '@mui/material';
import { makeAutoObservable, reaction } from 'mobx';
import RealEstateStore from '../RealEstateStore';
import MapTabSubStore from './MapTabSubStore';
import { ViewState } from 'react-map-gl';

export interface ImageProps {
  src: string;
  buttonProps: ButtonProps;
  isSelectedImage: boolean;
}

class ListingDialogStore {
  private _mapTabStore = new MapTabSubStore(this);
  private _dialogTargetIndex = -1;
  private _selectedImageIndex = -1;
  private _currentTab = 0;
  private _lastSelectedImageSrc = '/images/placeholder.jpg';

  public get mapTabStore() {
    return this._mapTabStore;
  }
  public get dialogTargetIndex() {
    return this._dialogTargetIndex;
  }
  public set dialogTargetIndex(value: number) {
    this._dialogTargetIndex = value;
  }
  public closeDialog() {
    this.dialogTargetIndex = -1;
  }
  public gotoNextDialogTarget() {
    if (this.dialogTargetIndex < this.filteredLength - 1) {
      this.dialogTargetIndex += 1;
    }
  }
  public gotoPreviousDialogTarget() {
    if (this.dialogTargetIndex > 0) {
      this.dialogTargetIndex -= 1;
    }
  }
  public get isFirstTarget() {
    return this._dialogTargetIndex === 0;
  }
  public get isLastTarget() {
    return this._dialogTargetIndex === this.filteredLength - 1;
  }
  public get selectedImageIndex() {
    return this._selectedImageIndex;
  }
  public set selectedImageIndex(value: number) {
    this._selectedImageIndex = value;
  }
  private get lastSelectedImageSrc() {
    return this._lastSelectedImageSrc;
  }
  private set lastSelectedImageSrc(value: string) {
    this._lastSelectedImageSrc = value;
  }
  public get currentTab() {
    return this._currentTab;
  }
  public set currentTab(value: number) {
    this._currentTab = value;
  }
  private get filteredLength() {
    return this.realEstateStore.filtered.length;
  }

  public getImageSrc(index: number) {
    const images = this.currentData?.images;
    if (images && index >= 0 && images.length > index) {
      return images[index];
    }
    return null;
  }
  public get selectedImageSrc() {
    const src = this.getImageSrc(this.selectedImageIndex);
    if (src) {
      this.lastSelectedImageSrc = src;
    }
    return src || this.lastSelectedImageSrc;
  }

  public get mappedImages(): ImageProps[] {
    const data = this.currentData;
    if (data) {
      if (this.selectedImageIndex === -1 && data.images.length) {
        this.selectedImageIndex = 0;
      }
      return data.images.map<ImageProps>((image, i) => ({
        src: image,
        buttonProps: {
          key: i,
          variant: 'outlined',
          color: i === this.selectedImageIndex ? 'primary' : 'secondary',
          onClick: () => {
            this.selectedImageIndex = i;
          }
        },
        isSelectedImage: i === this.selectedImageIndex
      }));
    }
    return [];
  }
  constructor(private realEstateStore: RealEstateStore) {
    makeAutoObservable(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.gotoPreviousDialogTarget = this.gotoPreviousDialogTarget.bind(this);
    this.gotoNextDialogTarget = this.gotoNextDialogTarget.bind(this);
  }

  public get currentData(): TransactionData {
    const { filtered } = this.realEstateStore;
    if (this.dialogTargetIndex !== -1 && filtered.length) {
      if (filtered.length > this.dialogTargetIndex) {
        return filtered[this.dialogTargetIndex];
      }
    }
    return {
      id: '',
      address: { address: '', city: '', state: 'AK', postalCode: '', coordinates: { lat: 0, lng: 0 } },
      elevator: 0,
      floor: 0,
      images: [],
      num_floors: 0,
      num_rooms: 0,
      parking: 'without',
      price: 0,
      sqm: 0
    };
  }

  public get addressCoords(): Pick<ViewState, 'longitude' | 'latitude'> {
    const coords = this.currentData?.address.coordinates;
    if (coords) {
      return { longitude: coords.lng, latitude: coords.lat };
    }
    return { longitude: 0, latitude: 0 };
  }
}

// export type ListingDialogStoreType = InstanceType<typeof ListingDialogStore>;

export const listingDialogStoreReactions = (listingDialogStore: ListingDialogStore) => {
  reaction(
    () => listingDialogStore.dialogTargetIndex,
    v => {
      if (v !== -1) {
        listingDialogStore.mapTabStore.viewState = {
          ...listingDialogStore.mapTabStore.viewState,
          ...listingDialogStore.addressCoords
        };
      }
    }
  );
};

export default ListingDialogStore;
