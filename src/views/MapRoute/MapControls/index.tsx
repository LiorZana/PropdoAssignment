import MapGL, { MapState } from '@/components/MapGL';
import RadiusDisplay from '@/components/MapGL/components/RadiusDisplay';
import {
  Card,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Switch,
  TextField,
  TextFieldProps,
  Typography,
  Fab
} from '@mui/material';
import { Box } from '@mui/system';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FullscreenControl, Marker, NavigationControl, ViewState } from 'react-map-gl';
import { useSearchParams } from 'react-router-dom';

const MapTextField = (props: Omit<TextFieldProps, 'type' | 'sx' | 'margin' | 'autoComplete'>) => (
  <FormControl>
    <TextField
      {...props}
      size='small'
      color='primary'
      margin='dense'
      sx={{ px: 1, pr: 2 }}
      inputProps={{ style: { paddingTop: '0.6rem', paddingBottom: '0.6rem' }, ...props.inputProps }}
      type='number'
      autoComplete='off'
    />
  </FormControl>
);

const RadiusLabel = ({
  disabled,
  value = '',
  onChange
}: {
  disabled?: boolean;
  value?: string;
  onChange?(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void;
}) => {
  return (
    <Box ml='auto' display='flex' alignItems='center' justifyContent='space-between'>
      <Typography>Show Radius</Typography>
      <TextField
        disabled={disabled}
        hiddenLabel
        size='small'
        margin='none'
        variant='outlined'
        value={value}
        onChange={onChange}
        sx={{ width: '5em', ml: 1 }}
        inputProps={{ style: { padding: '2px 2px 2px 6px' } }}
        InputProps={{
          endAdornment: <InputAdornment position='end'>m</InputAdornment>
        }}
      />
    </Box>
  );
};

interface MapControlsProps {
  viewState: ViewState;
  setViewState(state: ViewState): void;
  showMarker: boolean;
  showRadius: boolean;
  radiusCIR: number;
  setShowMarker(state: boolean): void;
  setShowRadius(state: boolean): void;
  setRadiusCIR(state: number): void;
}

const MapControls = ({
  viewState,
  setViewState,
  showMarker,
  showRadius,
  radiusCIR,
  setShowMarker,
  setShowRadius,
  setRadiusCIR
}: MapControlsProps) => {
  const updateState = (newState: Partial<ViewState>) => setViewState({ ...viewState, ...newState });

  return (
    <Box
      position='fixed'
      display='flex'
      flexDirection='column'
      top='56%'
      left='2%'
      py={1}
      zIndex={99999}
      borderRadius={2}
      component={Card}
    >
      <input hidden autoComplete='off' />
      <MapTextField
        value={viewState.longitude}
        onChange={e => updateState({ longitude: +e.target.value })}
        label='Longitude'
      />
      <MapTextField
        value={viewState.latitude}
        onChange={e => updateState({ latitude: +e.target.value })}
        label='Latitude'
      />
      <MapTextField
        inputProps={{ min: 0 }}
        value={viewState.zoom}
        onChange={e => updateState({ zoom: +e.target.value })}
        label='Zoom'
      />
      <FormControl sx={{ pl: 1 }}>
        <FormControlLabel
          label='Show Marker'
          control={<Switch checked={showMarker} onChange={(_, v) => setShowMarker(v)} />}
        />
      </FormControl>
      <FormControl sx={{ pl: 1 }}>
        <FormControlLabel
          style={{ width: 'fit-content' }}
          label={
            <RadiusLabel
              value={radiusCIR.toString()}
              onChange={e => setRadiusCIR(!Number.isNaN(+e.target.value) ? Math.min(9999, +e.target.value) : 100)}
              disabled={!showRadius}
            />
          }
          control={<Switch checked={showRadius} onChange={(_, v) => setShowRadius(v)} />}
        />
      </FormControl>
    </Box>
  );
};

export default MapControls;
