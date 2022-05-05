import MockAPI, { TransactionData } from '@/mockAPI';
import { filterMap, isInRange, mapObject } from '@/utils';
import { action, autorun, comparer, computed, makeAutoObservable } from 'mobx';
import stateDictionary from '@/data/states.json';
import {
  realEstateSortingMethods,
  RealEstateSorting,
  TransactionFilters,
  RealEstateSortingIndexes,
  realEstateSortingIndexes,
  handleMinMaxPrice,
  handleMinMaxRooms,
  getSetters,
  TransactionFiltersWithSetters,
  reduceObjArrNumPropToRange,
  reduceTransactionDataToOptions
} from './utils';

class RealEstateStore {
  public fetchStatus: 'idle' | 'fetching' | 'error' = 'idle';
  private _transactions: TransactionData[] = [];
  private _sorting: RealEstateSorting = RealEstateSorting.ADDRESS;
  protected _filters: TransactionFilters = {
    states: [],
    cities: [],
    address: '',
    price: { min: 0, max: 0 },
    rooms: { min: 0, max: 0 }
  };
  private _filterSetters = getSetters.apply(this);
  public get transactions() {
    return this._transactions;
  }
  public set transactions(value: TransactionData[]) {
    this._transactions = value;
  }

  constructor() {
    makeAutoObservable(this, { filterOptions: computed.struct });
    this.handleFetchSuccess = this.handleFetchSuccess.bind(this);
    this.handleFetchError = this.handleFetchError.bind(this);
    this.filterFunction = this.filterFunction.bind(this);
    this.getNumericDataRangeUnfiltered = this.getNumericDataRangeUnfiltered.bind(this);
    this.getNumericDataRangeFiltered = this.getNumericDataRangeFiltered.bind(this);
  }

  protected getFilterSetter<Key extends keyof TransactionFilters>(key: Key) {
    return (value: TransactionFilters[Key] | ((value: TransactionFilters[Key]) => TransactionFilters[Key])) => {
      if (typeof value === 'function') {
        this._filters[key] = value(this._filters[key]);
        return;
      }
      this._filters[key] = value;
    };
  }
  public get filters(): TransactionFiltersWithSetters {
    return { ...this._filters, set: this._filterSetters };
  }
  public get sorted() {
    return [...this.transactions].sort(realEstateSortingMethods[this._sorting]);
  }

  public get sortBy() {
    return this._sorting;
  }
  public setSortBy(sorting: keyof typeof RealEstateSorting | keyof RealEstateSortingIndexes) {
    if (typeof sorting === 'number') {
      this._sorting = realEstateSortingIndexes[sorting];
      return;
    }
    this._sorting = RealEstateSorting[sorting];
  }

  public get isFetching() {
    return this.fetchStatus === 'fetching';
  }

  private filterFunction(item: TransactionData) {
    return (
      (!this.filters.states.length || this.filters.states.findIndex(s => s.key === item.address.state) !== -1) &&
      (!this.filters.cities.length || this.filters.cities.indexOf(item.address.city) !== -1) &&
      (!this.filters.address.length ||
        item.address.address.toLowerCase().indexOf(this.filters.address.toLowerCase()) !== -1) &&
      isInRange(item.price, this.filters.price.min, this.filters.price.max) &&
      isInRange(item.num_rooms, this.filters.rooms.min, this.filters.rooms.max)
    );
  }

  public get filterOptions() {
    return reduceTransactionDataToOptions(this.transactions, this._filters);
  }
  public get filterOptionsFiltered() {
    return reduceTransactionDataToOptions(this.filtered, this._filters);
  }

  public get filtered() {
    return this.sorted.filter(this.filterFunction);
  }

  public get highestPrice() {
    return Math.max.apply(
      this,
      this.transactions.map(t => t.price)
    );
  }
  public get lowestPrice() {
    return Math.min.apply(
      this,
      this.transactions.map(t => t.price)
    );
  }
  public get highestRoom_num() {
    return Math.max.apply(
      this,
      this.transactions.map(t => t.num_rooms)
    );
  }
  public get lowestRoom_num() {
    return Math.min.apply(
      this,
      this.transactions.map(t => t.num_rooms)
    );
  }

  // get totalPriceRange(): UTILS.Range {
  //   return reduceObjArrNumPropToRange(this.transactions, 'price');
  // }

  // get totalRoomRange(): UTILS.Range {
  //   return reduceObjArrNumPropToRange(this.transactions, 'num_rooms');
  // }

  public getNumericDataRangeUnfiltered(property: keyof UTILS.PickByType<TransactionData, number>) {
    return reduceObjArrNumPropToRange(this.transactions, property);
  }

  public getNumericDataRangeFiltered(property: keyof UTILS.PickByType<TransactionData, number>) {
    return reduceObjArrNumPropToRange(this.filtered, property);
  }

  public async fetchData() {
    this.fetchStatus = 'fetching';
    MockAPI.fetch().then(this.handleFetchSuccess, this.handleFetchError);
  }

  private setTransactions(v: TransactionData[]) {
    this.transactions = v;
  }

  private handleFetchSuccess(data: TransactionData[]) {
    this.setTransactions(data);
    handleMinMaxPrice.apply(this);
    handleMinMaxRooms.apply(this);
    this.fetchStatus = 'idle';
  }
  private handleFetchError() {
    this.fetchStatus = 'error';
  }
}

// export type RealEstateStoreType = InstanceType<new () => RealEstateStore>;
export default RealEstateStore;
