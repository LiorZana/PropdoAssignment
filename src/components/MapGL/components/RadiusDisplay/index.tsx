import { FillLayer } from 'mapbox-gl';
import { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GeoLocation } from '@/types/MapGL';
import * as turf from '@turf/turf';
import { useMemo } from 'react';

// const squareGeoJson = (longitude: number, latitude: number, radius: number): GeoJSON.FeatureCollection => {
//   radius = turf.convertDistance(radius, 'meters', 'degrees');
//   const south = latitude - radius;
//   const west = longitude - radius;
//   const north = latitude + radius;
//   const east = longitude + radius;
//   return {
//     type: 'FeatureCollection',
//     features: [
//       {
//         type: 'Feature',
//         properties: {},
//         geometry: {
//           type: 'Polygon',
//           coordinates: [
//             [
//               [west, south],
//               [east, south],
//               [east, north],
//               [west, north],
//               [west, south]
//             ]
//           ]
//         }
//       }
//     ]
//   };
// };

const layerStyle: FillLayer = {
  id: 'point',
  type: 'fill',
  paint: {
    'fill-color': '#205681',
    'fill-outline-color': '#d3d61c',
    'fill-opacity': 0.4
  }
};

const RadiusDisplay = ({
  longitude,
  latitude,
  radius,
  sourceId
}: GeoLocation & { radius: false | number; sourceId: string }) => {
  const circle = useMemo(
    () => turf.circle([longitude, latitude], radius || 0, { steps: 50, units: 'meters' }),
    [longitude, latitude, radius]
  );

  return (
    <Source id={sourceId} type='geojson' data={circle}>
      {!!radius && <Layer {...layerStyle} id={sourceId} />}
    </Source>
  );
};

export default RadiusDisplay;
