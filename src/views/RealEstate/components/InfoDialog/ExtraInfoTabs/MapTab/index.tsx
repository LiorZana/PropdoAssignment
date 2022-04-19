import { Button, Tooltip } from '@mui/material';
import { css } from '@emotion/react';
import React, { ReactNode, useState } from 'react';
import MapGL from '@/components/MapGL';
import { Marker, Popup, NavigationControl, ViewState, FullscreenControl } from 'react-map-gl';
import MapIcon from '@mui/icons-material/Map';
import { useNavigate } from 'react-router-dom';

export interface MapTabProps {
  viewState: ViewState;
  onChange: (state: ViewState) => void;
  addressLocation: { longitude: number; latitude: number };
  addressLabel: ReactNode;
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
          color='secondary'
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

const MapTab = ({ viewState, onChange, addressLocation, addressLabel }: MapTabProps) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();
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
            onButtonClick={() => navigate(`/map?lng=${addressLocation.longitude}&lat=${addressLocation.latitude}`)}
          />
        )
      }}
      viewState={viewState}
      onChange={onChange}
      height={300}
    >
      <Marker
        onClick={() => setPopupOpen(!popupOpen)}
        style={{ cursor: 'pointer' }}
        longitude={addressLocation.longitude}
        latitude={addressLocation.latitude}
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
          longitude={addressLocation.longitude}
          latitude={addressLocation.latitude}
        >
          {addressLabel}
        </Popup>
      )}
    </MapGL>
  );
};

export default MapTab;
