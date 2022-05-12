import MapControls from './MapControls';
import MapGL from '@/components/MapGL';
import RadiusDisplay from '@/components/MapGL/components/RadiusDisplay';
import { FullscreenControl, Marker, NavigationControl, ViewState } from 'react-map-gl';
import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// import { Fab } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';

const radiusDisplayId = 'map-route-radius-display';

const MapRoute = () => {
  const [search] = useSearchParams();
  const hasLngLat = useRef(search.has('lng') && search.has('lat'));
  const searchLngLat = useRef(
    (function () {
      if (hasLngLat.current) {
        const lng = +(search.get('lng') || 0);
        const lat = +(search.get('lat') || 0);
        if (lng && lat) {
          return { longitude: lng, latitude: lat };
        }
      }
      return { longitude: 34.57439, latitude: 31.68334 };
    })()
  );
  const [viewState, setViewState] = useState<ViewState>({
    ...searchLngLat.current,
    zoom: 15,
    bearing: 0,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
    pitch: 0
  });
  const [showMarker, setShowMarker] = useState(!!hasLngLat.current);
  const [showRadius, setShowRadius] = useState(!hasLngLat.current);
  const [radiusCIR, setRadiusCIR] = useState(100);

  return (
    <div style={{ position: 'relative' }}>
      <MapGL reuseMaps={false} height={'93.5vh'} viewState={viewState} onChange={setViewState}>
        {showMarker && (
          <Marker longitude={viewState.longitude} latitude={viewState.latitude}>
            <img src='/images/mapbox-markerIcon.png' alt='map marker' />
          </Marker>
        )}
        {showRadius && (
          <RadiusDisplay
            longitude={viewState.longitude}
            latitude={viewState.latitude}
            radius={radiusCIR}
            sourceId={radiusDisplayId}
          />
        )}

        <FullscreenControl position='top-right' />
        <NavigationControl position='top-right' />
      </MapGL>
      {/* <Fab sx={{ position: 'fixed', top: '80%', left: '1px', zIndex: 9999 }}>
        <AddIcon />
      </Fab> */}
      <MapControls
        viewState={viewState}
        setViewState={setViewState}
        showRadius={showRadius}
        showMarker={showMarker}
        radiusCIR={radiusCIR}
        setShowRadius={setShowRadius}
        setShowMarker={setShowMarker}
        setRadiusCIR={setRadiusCIR}
      />
    </div>
  );
};

export default MapRoute;
