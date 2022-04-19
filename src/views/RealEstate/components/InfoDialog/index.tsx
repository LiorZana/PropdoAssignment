import { TransactionData } from '@/mockAPI';
import {
  Button,
  capitalize,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Tooltip,
  Typography
} from '@mui/material';
import { ComponentType, CSSProperties, HTMLProps, PropsWithChildren, ReactNode, useMemo, useState } from 'react';
import PriceIcon from '@mui/icons-material/PriceChange';
import ElevatorIcon from '@mui/icons-material/Elevator';
import LayersIcon from '@mui/icons-material/Layers';
import RulerIcon from '@mui/icons-material/Straighten';
import DimensionsIcon from '@/components/DimensionsIcon';
import ParkingIcon from '@mui/icons-material/DirectionsCarFilledTwoTone';
import RoomIcon from '@mui/icons-material/MeetingRoom';
import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CloseIcon from '@mui/icons-material/Close';
import { abbreviateNumber, stringToNumber } from '@/utils';
import { css, useTheme } from '@emotion/react';
import ExtraInfoTabs from './ExtraInfoTabs';
import { getAddressLabel } from '../../utils';
import listingTabsStore from '@/stores/ListingTabsStore';

type IconDictionaryType = {
  [key in keyof Omit<TransactionData, 'id' | 'images' | 'num_floors'>]: ComponentType<any>;
} & {
  num_floors(floor: string | number): ComponentType<any>;
};
const IconDictionary: IconDictionaryType = {
  price: PriceIcon,
  elevator: ElevatorIcon,
  sqm: DimensionsIcon,
  parking: ParkingIcon,
  floor: LayersIcon,
  num_rooms: RoomIcon,
  address: RoomIcon, // TODO: change icon
  num_floors: (floor: string | number) => {
    if (typeof floor == 'string') floor = parseInt(floor);
    return Number.isNaN(floor) || floor > 1 ? ApartmentIcon : HouseIcon;
  }
};

const InfoListItem = ({
  data,
  property,
  tooltip
}: {
  data: string | number;
  property: keyof Omit<TransactionData, 'id' | 'images'>;
  tooltip?: ReactNode;
}) => {
  const { palette } = useTheme();
  const Icon = property !== 'num_floors' ? IconDictionary[property] : IconDictionary[property](data);
  return (
    <ListItem disablePadding>
      <ListItemButton disableTouchRipple sx={{ display: 'flex', px: 2, cursor: 'auto' }}>
        <ListItemIcon sx={{ p: 0, height: '25px', minWidth: '40px', flex: '0 1 auto' }}>
          <Icon
            sx={(theme: Theme) => ({
              p: 0,
              boxShadow: '0px 1px 2px 0 grey',
              borderRadius: 1,
              color: palette.primary.dark
            })}
          />
        </ListItemIcon>
        <ListItemText
          sx={{ p: 0, flex: '0 1 auto' }}
          primaryTypographyProps={{
            variant: 'subtitle2',
            textAlign: 'center',
            lineHeight: '1rem',
            color: palette.getContrastText(palette.background.paper)
          }}
          primary={tooltip || capitalize(property)}
        />

        <ListItemText
          primary={data}
          primaryTypographyProps={{
            variant: 'subtitle2',
            textAlign: 'right',
            color: palette.secondary[palette.mode === 'light' ? 'dark' : 'light']
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

const parkingDictionary = { without: 0, single: 1, double: 2 };

const InfoDialog = ({ data, onClose }: { data: TransactionData; onClose?(): void }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  if (!data) return null;
  const imageStyle = (src: string) => css`
    background-image: url(${src});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    margin: auto 0;
    position: relative;
  `;

  const buttonStyle = css`
    width: 40px;
    height: 50px;
    padding: 0;
    margin: 0 0.2rem;
  `;

  return (
    <Grid container height='fit-content' maxWidth='100%' mx='auto' justifyContent='flex-start'>
      <Grid item xs={2}>
        <Button
          onClick={onClose}
          aria-label='Close button'
          variant='text'
          color='primary'
          sx={{ width: '100%', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        >
          <CloseIcon />
        </Button>
      </Grid>
      <Grid item container xs={12} pb={1}>
        <Grid item xs={7} display='flex' justifyContent='center'>
          <Card elevation={3} sx={{ height: '100%', width: '100%', borderRadius: '5px 0 5px 0' }}>
            <CardContent
              css={theme =>
                css`
                  ${imageStyle(data.images[selectedImage])}
                  height: 65%;
                  border: 1px solid ${theme.palette.secondary.dark}44;
                `
              }
            />
            <CardContent
              css={{
                height: '35%',
                padding: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:last-child': {
                  padding: 0
                }
              }}
            >
              {data.images.map((image, i) => (
                <Button
                  key={i}
                  variant='outlined'
                  color={i === selectedImage ? 'secondary' : 'primary'}
                  onClick={() => setSelectedImage(i)}
                  css={buttonStyle}
                  style={{ position: 'relative' }}
                >
                  <div css={imageStyle(image)} style={{ height: '50px' }} />
                  {i === selectedImage && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        backgroundColor: '#2c2c2c52'
                      }}
                    />
                  )}
                </Button>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <List disablePadding style={{ width: '100%' }}>
            <InfoListItem data={data.price.toLocaleString('en') + '$'} property='price' />
            <InfoListItem data={data.sqm + 'm²'} property='sqm' tooltip='Building size' />
            <InfoListItem data={data.num_rooms} property='num_rooms' tooltip='Rooms' />
            <InfoListItem data={data.floor} property='floor' />
            <InfoListItem data={data.num_floors} property='num_floors' tooltip='Floors total' />
            <InfoListItem data={data.elevator} property='elevator' tooltip='Elevators' />
            <InfoListItem
              data={parkingDictionary[data.parking || 'without']}
              property='parking'
              tooltip='Parking spaces'
            />
          </List>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ExtraInfoTabs
          store={listingTabsStore}
          addressLabel={getAddressLabel(data.address)}
          addressLocation={{ longitude: data.address.coordinates.lng, latitude: data.address.coordinates.lat }}
        />
      </Grid>
    </Grid>
  );
};

export default InfoDialog;
