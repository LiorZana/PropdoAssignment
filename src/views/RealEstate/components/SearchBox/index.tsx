import { StateKey } from '@/types/address';
import { Autocomplete, AutocompleteProps, Divider, TextField, TextFieldProps, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { StatesObject } from '@/stores/RealEstateStore/utils';
import RealEstateStore from '@/stores/RealEstateStore';

const textFieldProps: TextFieldProps = { size: 'small', margin: 'dense', type: 'text', autoComplete: 'off' };

const autoCompleteProps: Omit<AutocompleteProps<any, undefined, undefined, undefined>, 'options' | 'renderInput'> = {
  size: 'small',
  fullWidth: true,
  disablePortal: true,
  filterSelectedOptions: true,
  autoComplete: false
};

const SearchBox = observer(
  ({
    onStatesChange,
    onCitiesChange,
    onAddressChange,
    store
  }: {
    states: { name: string; key: StateKey }[];
    cities: string[];
    addresses: string[];
    onStatesChange: (states: StatesObject[]) => void;
    onCitiesChange: (cities: string[]) => void;
    onAddressChange: (newAddress: string) => void;
    store: RealEstateStore;
  }) => {
    const { filters, filterOptions } = store;
    const { states, cities, addresses } = filterOptions;
    return (
      <div
        css={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          marginBottom: '0.5rem',
          padding: '0 0.5rem'
        }}
      >
        <Autocomplete
          {...(autoCompleteProps as AutocompleteProps<StatesObject, true, false, false>)}
          multiple
          options={states}
          value={filters.states.length ? filters.states : []}
          getOptionLabel={o => o.name}
          isOptionEqualToValue={(o, v) => o.key === v.key}
          onChange={(_, v) => filters.set.states(v)}
          renderInput={params => <TextField {...textFieldProps} placeholder='Select states' {...params} />}
        />
        <Divider sx={{ my: 0.5 }} variant='middle' flexItem />
        <Autocomplete
          {...(autoCompleteProps as AutocompleteProps<string, true, false, false>)}
          value={filters.cities.length ? filters.cities : []}
          multiple
          onChange={(_, v) => filters.set.cities(v)}
          options={cities}
          disabled={!cities.length}
          renderInput={params => <TextField {...textFieldProps} placeholder='Select cities' {...params} />}
        />
        <Divider sx={{ my: 0.5 }} variant='middle' flexItem />
        <Autocomplete
          {...(autoCompleteProps as AutocompleteProps<string, false, false, false>)}
          onChange={(_, v) => filters.set.address(v || '')}
          value={filters.address || null}
          options={addresses}
          disabled={!addresses.length}
          renderInput={params => <TextField {...textFieldProps} placeholder='Select an address' {...params} />}
        />
      </div>
    );
  }
);

export default SearchBox;
