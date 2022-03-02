import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { CircleLayer } from 'mapbox-gl';
import { useState } from 'react';
import MapGl, { Source, Layer } from 'react-map-gl';

const geojson = (longitude: number, latitude: number): GeoJSON.FeatureCollection => ({
  type: 'FeatureCollection',
  features: [{ type: 'Feature', properties: [], geometry: { type: 'Point', coordinates: [longitude, latitude] } }]
});

const layerStyle = (radius: number): CircleLayer => ({
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': radius,
    'circle-stroke-width': 2,
    'circle-opacity': 0,
    'circle-stroke-color': '#007cbf'
  }
});

const accessToken = import.meta.env.VITE_MAPBOX_ACCES_TOIKEN as string;

const Map = () => {
  const [viewState, setViewState] = useState<{
    longitude: string;
    latitude: string;
    zoom: string;
    radius: string | false;
  }>({
    longitude: '34.85',
    latitude: '32.04',
    zoom: '10',
    radius: '100'
  });

  const updateState = (newState: Partial<typeof viewState>) => setViewState({ ...viewState, ...newState });
  return (
    <div style={{ position: 'relative' }}>
      <MapGl
        mapboxAccessToken={accessToken}
        latitude={+viewState.latitude}
        longitude={+viewState.longitude}
        zoom={+viewState.zoom}
        onDrag={e =>
          updateState({
            longitude: e.viewState.longitude.toString(),
            latitude: e.viewState.latitude.toString(),
            zoom: e.viewState.zoom.toString()
          })
        }
        onZoom={e => updateState({ zoom: e.viewState.zoom.toString() })}
        style={{ width: '100%', height: 800 }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
      >
        <Source id='my-data' type='geojson' data={geojson(+viewState.longitude, +viewState.latitude)}>
          <Layer {...layerStyle(+viewState.radius)} />
        </Source>
      </MapGl>
      <Box
        position='fixed'
        display='flex'
        flexDirection='column'
        bottom='10%'
        left='2%'
        style={{ backgroundColor: 'white' }}
      >
        <TextField
          sx={{ p: 1 }}
          type='number'
          value={viewState.longitude}
          onChange={e => updateState({ longitude: e.target.value })}
          label='Longitude'
        />
        <TextField
          sx={{ p: 1 }}
          type='number'
          value={viewState.latitude}
          onChange={e => updateState({ latitude: e.target.value })}
          label='Latitude'
        />
        <TextField
          sx={{ p: 1 }}
          type='number'
          inputProps={{ min: 0 }}
          value={viewState.zoom}
          onChange={e => updateState({ zoom: e.target.value })}
          label='Zoom'
        />
        <TextField
          sx={{ p: 1 }}
          type='number'
          inputProps={{ min: 0 }}
          value={viewState.radius}
          onChange={e => updateState({ radius: e.target.value })}
          label='Radius'
        />
      </Box>
    </div>
  );
};

export default Map;
