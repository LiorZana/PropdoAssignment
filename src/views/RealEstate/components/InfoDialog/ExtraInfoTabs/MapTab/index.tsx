import { Button, Tooltip } from '@mui/material';
import { css } from '@emotion/react';
import React from 'react';
import MapGL from '@/components/MapGL';
import { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl';
import MapIcon from '@mui/icons-material/Map';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import MapTabSubStore from '@/stores/ListingDialogStore/MapTabSubStore';

export interface MapTabProps {
  store: MapTabSubStore;
}

const MapExtUI = ({ onButtonClick }: { onButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void }) => {
  return (
    <div
      css={css`
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        z-index: 9999;
        pointer-events: none;
        user-select: none;
        box-shadow: inset 0 0 3px 0 black;
      `}
    >
      <Tooltip
        // PopperProps={{ popperOptions: { modifiers: [{ name: 'offset', options: { offset: [0, -5] } }] } }}
        placement='bottom-start'
        title='View in full map'
        followCursor
      >
        <Button
          color='info'
          variant='contained'
          size='small'
          onClick={onButtonClick}
          css={css`
            pointer-events: auto;
            user-select: auto;
            border-radius: 5px 0 5px 0;
            opacity: 0.5;
            transition: all 0.3s;
            :hover {
              opacity: 1;
            }
          `}
        >
          <MapIcon />
        </Button>
      </Tooltip>
    </div>
  );
};

const MapTab = observer(({ store }: MapTabProps) => {
  const navigate = useNavigate();
  const { viewState, addressCoords, addressLabel, popupOpen, togglePopup } = store;

  return (
    <MapGL
      rootProps={{
        css: css`
          position: relative;
          box-shadow: 0 0 1px 0 black;
          border-radius: 5px;
          > div {
            border-radius: 5px;
          }
        `,
        children: (
          <MapExtUI
            onButtonClick={() => navigate(`/map?lng=${addressCoords.longitude}&lat=${addressCoords.latitude}`)}
          />
        )
      }}
      viewState={viewState}
      onChange={v => {
        store.viewState = v;
      }}
      height={300}
    >
      <Marker
        onClick={() => {
          togglePopup();
        }}
        style={{ cursor: 'pointer' }}
        longitude={addressCoords.longitude}
        latitude={addressCoords.latitude}
      >
        <img src='/images/mapbox-markerIcon.png' alt='map marker' />
      </Marker>
      <FullscreenControl position='top-right' />
      <NavigationControl position='top-right' />
      {popupOpen && (
        <Popup
          closeOnMove={false}
          closeOnClick={false}
          closeButton={false}
          offset={[0, -20]}
          longitude={addressCoords.longitude}
          latitude={addressCoords.latitude}
        >
          {addressLabel}
        </Popup>
      )}
    </MapGL>
  );
});

export default MapTab;
