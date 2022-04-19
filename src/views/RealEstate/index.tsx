import MockAPI, { TransactionData } from '@/mockAPI';
import { useTheme } from '@emotion/react';
import { Box, Dialog, Grid, Stack, useMediaQuery } from '@mui/material';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import ListCard from './components/ListCard';
import InfoDialog from './components/InfoDialog';
import ListCardSkeleton from './components/ListCardSkeleton';
import SearchBox from './components/SearchBox';
import SortBox from './components/SortBox';
import { sortingOptions, sortingMethods } from './utils';
import { conditionalFilterMap, filterMap, isInRange } from '@/utils';
import stateDictionary from '@/data/states.json';
import { StateKey } from '@/types/address';
import PriceSlider from './components/PriceSlider';
import RoomFilter from './components/RoomFilter';
import useOnScroll from '@/hooks/useOnScroll';
type RangeTuple = UTILS.RangeTuple;

type TransactionFilters = [states: StateKey[], city: string[], address: false | string, price: RangeTuple];
type FiltersAction =
  | { type: 'setStates'; payload: StateKey[] }
  | { type: 'setCities'; payload: string[] }
  | { type: 'setAddress'; payload: string }
  | { type: 'setPrice'; payload: RangeTuple }
  | { type: 'setPriceMin' | 'setPriceMax'; payload: number };
export type StatesObject = { name: string; key: StateKey };

const initialFiltersState: TransactionFilters = [[], [], false, [0, 1]];
const filtersReducer = (state: TransactionFilters, action: FiltersAction): TransactionFilters => {
  const [states, city, address, price] = state;
  switch (action.type) {
    case 'setPrice': {
      return [states, city, address, action.payload];
    }
    case 'setPriceMin': {
      return [states, city, address, [action.payload, price[1]]];
    }
    case 'setPriceMax': {
      return [states, city, address, [price[0], action.payload]];
    }
    case 'setCities': {
      return [states, action.payload, address, price];
    }
    case 'setStates': {
      return [action.payload, city, address, price];
    }
    case 'setAddress': {
      return [states, city, action.payload || false, price];
    }
    default:
      return state;
  }
};

const RealEstate = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [state, setState] = useState<TransactionData[]>([]);
  const [sorted, setSorted] = useState<TransactionData[]>([]);
  const [filters, dispatchFilters] = useReducer(filtersReducer, initialFiltersState);
  const [statesFilter, cityFilter, addressFilter, priceFilter] = filters;
  const [minPrice, maxPrice] = priceFilter;
  const [dialogState, setDialogState] = useState(-1);
  const [isFetching, setFetching] = useState(false);
  const scrollPosition = useOnScroll();
  const { heighestPrice, lowestPrice } = useMemo(
    () =>
      state.reduce(
        (prev, curr) => {
          if (curr.price > prev.heighestPrice) {
            return { heighestPrice: curr.price, lowestPrice: prev.lowestPrice };
          }
          if (!prev.lowestPrice || curr.price < prev.lowestPrice) {
            return { heighestPrice: prev.heighestPrice, lowestPrice: curr.price };
          }
          return prev;
        },
        { heighestPrice: 0, lowestPrice: 0 }
      ),
    [state]
  );

  const setStates = useCallback(
    (states: StateKey[]) => dispatchFilters({ type: 'setStates', payload: states }),
    [dispatchFilters]
  );
  const setCities = useCallback(
    (cities: string[]) => dispatchFilters({ type: 'setCities', payload: cities }),
    [dispatchFilters]
  );
  const setAddress = useCallback(
    (address: string) => dispatchFilters({ type: 'setAddress', payload: address }),
    [dispatchFilters]
  );
  const setPrice = useCallback(
    (price: RangeTuple) => dispatchFilters({ type: 'setPrice', payload: price }),
    [dispatchFilters]
  );
  const setPriceComponent = useCallback(
    (priceComp: number, component: 'min' | 'max') =>
      dispatchFilters({ type: component === 'min' ? 'setPriceMin' : 'setPriceMax', payload: priceComp }),
    [dispatchFilters]
  );

  useEffect(() => {
    if (minPrice < lowestPrice) {
      setPriceComponent(lowestPrice, 'min');
    }
  }, [minPrice, lowestPrice, setPriceComponent]);

  useEffect(() => {
    if (maxPrice > heighestPrice || maxPrice < lowestPrice) {
      setPriceComponent(heighestPrice, 'max');
    }
  }, [maxPrice, heighestPrice, lowestPrice, setPriceComponent]);

  useEffect(() => {
    setFetching(true);
    MockAPI.fetch().then(v => {
      setState(v);
      setSorted(v.sort(sortingMethods.Address));
      setFetching(false);
    });
  }, []);

  const filterFunction = (item: TransactionData) =>
    (!statesFilter.length || statesFilter.indexOf(item.address.state) !== -1) &&
    (!cityFilter.length || cityFilter.indexOf(item.address.city) !== -1) &&
    (!addressFilter || item.address.address.toLowerCase().indexOf(addressFilter.toLowerCase()) !== -1) &&
    isInRange(item.price, priceFilter[0], priceFilter[1]);

  const { states, cities, addresses, rooms } = sorted.reduce<{
    states: StatesObject[];
    cities: string[];
    addresses: string[];
    rooms: number[];
  }>(
    (prev, curr) => {
      const states = [...prev.states];
      if (!prev.states.find(s => s.key === curr.address.state)) {
        states.push({ key: curr.address.state, name: stateDictionary[curr.address.state] });
      }
      const cities = [...prev.cities];
      if (
        cities.indexOf(curr.address.city) === -1 &&
        (!statesFilter.length || statesFilter.indexOf(curr.address.state) !== -1)
      ) {
        cities.push(curr.address.city);
      }
      const addresses = [...prev.addresses];
      if (!cityFilter.length || cityFilter.indexOf(curr.address.city) !== -1) {
        addresses.push(curr.address.address);
      }
      const rooms = [...prev.rooms];
      if (rooms.indexOf(curr.num_rooms) === -1) {
        rooms.push(curr.num_rooms);
      }

      return {
        states,
        cities,
        addresses,
        rooms
      };
    },
    { states: [], cities: [], addresses: [], rooms: [] }
  );

  return (
    <>
      <Dialog
        disableEnforceFocus
        disablePortal
        open={dialogState !== -1}
        PaperProps={{ sx: { justifyContent: 'center' } }}
        fullWidth
        fullScreen={fullScreen}
      >
        <InfoDialog data={state[dialogState]} onClose={() => setDialogState(-1)} />
      </Dialog>
      <Grid
        container
        justifyContent='space-between'
        columnSpacing={{ xs: 0, md: 3 }}
        sx={{ mt: 2, mx: '0 !important', pr: { xs: 1, md: 2 }, pl: 1, maxWidth: { xs: '98%', md: '100%' } }}
      >
        <Grid item xs={12} md={3} xl={2}>
          <Stack
            component='form'
            sx={{
              px: { xs: 2, md: 0 },
              transition: 'all 0.5s ease-in-out',
              transitionDelay: '0.1s',
              transformOrigin: 'center',
              marginTop: { md: scrollPosition + 'px' }
            }}
          >
            <SearchBox
              onStatesChange={setStates}
              onCitiesChange={setCities}
              onAddressChange={setAddress}
              states={states}
              cities={cities}
              addresses={addresses}
            />
            <PriceSlider
              // priceValue={priceFilter || [lowestPrice, heighestPrice]}
              priceRange={[lowestPrice, heighestPrice]}
              onPriceChange={setPrice}
              onPriceComponentChange={setPriceComponent}
            />
            <RoomFilter rooms={rooms} />
            <SortBox
              defaultValue={0}
              onChange={e => setSorted(fs => fs.slice().sort(sortingMethods[sortingOptions[+e.target.value]]))}
              options={sortingOptions}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={9} xl={10}>
          <Grid maxWidth='100%' container justifyContent='space-evenly' rowSpacing={3} columnSpacing={1} m={0}>
            {isFetching
              ? Array.from(Array(20)).map((_, i) => (
                  <Grid item key={i}>
                    <ListCardSkeleton />
                  </Grid>
                ))
              : filterMap(sorted, filterFunction, (data, i) => (
                  <Grid onClick={() => setDialogState(i)} key={i} item>
                    <ListCard data={data} />
                  </Grid>
                ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RealEstate;
