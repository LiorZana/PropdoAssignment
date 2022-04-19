import { StateKey } from '@/types/address';
import { Autocomplete, Divider, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { StatesObject } from '../..';

const SearchBox = ({
  states,
  cities,
  addresses,
  onStatesChange,
  onCitiesChange,
  onAddressChange
}: {
  states: { name: string; key: StateKey }[];
  cities: string[];
  addresses: string[];
  onStatesChange: (states: StateKey[]) => void;
  onCitiesChange: (cities: string[]) => void;
  onAddressChange: (newAddress: string) => void;
}) => {
  const [statesFilters, setStatesFilters] = useState<StatesObject[]>([]);
  const [cityFilters, setCityFilters] = useState<string[]>([]);
  const [addressFilter, setAddressFilter] = useState<string | null>(null);

  useEffect(() => {
    const inCities = cityFilters.filter(f => cities.indexOf(f) !== -1);
    if (inCities.length !== cityFilters.length) {
      setCityFilters(inCities);
    }
  }, [cityFilters, cities]);

  useEffect(() => {
    if (addressFilter && addresses.indexOf(addressFilter) === -1) {
      setAddressFilter(null);
    }
  }, [addressFilter, addresses]);

  useEffect(() => {
    onStatesChange(statesFilters.map(s => s.key));
  }, [onStatesChange, statesFilters]);

  useEffect(() => {
    onCitiesChange(cityFilters);
  }, [onCitiesChange, cityFilters]);

  useEffect(() => {
    onAddressChange(addressFilter || '');
  }, [onAddressChange, addressFilter]);

  return (
    <div>
      <Typography>Filter locations</Typography>
      <div
        css={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column'
        }}
      >
        <Autocomplete
          onChange={(_, v) => setStatesFilters(v)}
          disablePortal
          fullWidth
          multiple
          getOptionLabel={o => o.name}
          isOptionEqualToValue={(o, v) => o.key === v.key}
          filterSelectedOptions
          options={states}
          value={statesFilters}
          renderInput={params => (
            <TextField margin='dense' autoComplete='off' placeholder='Select states' {...params} />
          )}
        />
        <Divider sx={{ my: 1 }} variant='middle' flexItem />
        <Autocomplete
          value={cityFilters.filter(f => cities.indexOf(f) !== -1)}
          multiple
          onChange={(_, v) => setCityFilters(v)}
          filterSelectedOptions
          fullWidth
          options={cities}
          disablePortal
          autoComplete={false}
          disabled={!cities.length}
          renderInput={params => (
            <TextField margin='dense' type='text' autoComplete='off' placeholder='Select cities' {...params} />
          )}
        />
        <Divider sx={{ my: 1 }} variant='middle' flexItem />
        <Autocomplete
          onChange={(_, v) => setAddressFilter(v)}
          value={addressFilter === null || addresses.indexOf(addressFilter) === -1 ? null : addressFilter}
          fullWidth
          options={addresses}
          disabled={!addresses.length}
          disablePortal
          autoComplete={false}
          renderInput={params => (
            <TextField margin='dense' type='text' autoComplete='off' placeholder='Select an address' {...params} />
          )}
        />
      </div>
    </div>
  );
};

export default SearchBox;
