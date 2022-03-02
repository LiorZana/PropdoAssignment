import MockAPI, { ParkingType, TransactionData } from '@/mockAPI';
import { useTheme } from '@emotion/react';
import {
  Button,
  capitalize,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Dialog,
  Grid,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';
import { ComponentType, HTMLProps, PropsWithChildren, ReactNode, useEffect, useMemo, useState } from 'react';
import ListCard from './ListCard';
import PriceIcon from '@mui/icons-material/PriceChange';
import ElevatorIcon from '@mui/icons-material/Elevator';
import LayersIcon from '@mui/icons-material/Layers';
import RulerIcon from '@mui/icons-material/Straighten';
import ParkingIcon from '@mui/icons-material/DirectionsCarFilledTwoTone';
import RoomIcon from '@mui/icons-material/MeetingRoom';
import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { abbreviateNumber, stringToNumber } from '@/utils';

type IconDictionaryType = { [key in keyof Omit<TransactionData, 'id' | 'image' | 'floor'>]: ComponentType<any> } & {
  floor(floor: string | number): ComponentType<any>;
};
const IconDictionary: IconDictionaryType = {
  price: PriceIcon,
  elevator: ElevatorIcon,
  sqm: RulerIcon,
  parking: ParkingIcon,
  num_floors: LayersIcon,
  num_rooms: RoomIcon,
  floor: (floor: string | number) => {
    if (typeof floor == 'string') floor = parseInt(floor);
    return Number.isNaN(floor) || floor > 1 ? ApartmentIcon : HouseIcon;
  }
};

const InfoDisplay = ({
  data,
  property,
  tooltip
}: {
  data: string | number;
  property: keyof Omit<TransactionData, 'id' | 'image'>;
  tooltip?: ReactNode;
}) => {
  const Icon = property !== 'floor' ? IconDictionary[property] : IconDictionary[property](data);
  return (
    <Card style={{ width: '60px', height: '55px', padding: '0.4rem', justifyContent: 'center' }}>
      <Tooltip arrow title={tooltip || capitalize(property)}>
        <CardMedia sx={{ p: 0, width: 'fit-content', height: '25px', mx: 'auto' }}>
          <Icon sx={{ p: 0 }} />
        </CardMedia>
      </Tooltip>
      <Typography variant='subtitle2' textAlign='center'>
        {data}
      </Typography>
    </Card>
  );
};

// export interface TransactionData {
//     price: number | string;
//     sqm: number | string;
//     num_rooms: number | string;
//     floor: number | string;
//     num_floors: number | string;
//     elevator: 0;
//     parking: 'single' | 'double' | 'without' | null;
//     image: string;
//     id: string;
//   }

const DialogImage = ({ src, ...rest }: PropsWithChildren<{ src: string } & HTMLProps<HTMLDivElement>>) => (
  <div
    style={{
      backgroundImage: `url(${src})`,
      backgroundSize: '90% auto',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '100%',
      height: '100%',
      margin: 'auto 0',
      position: 'relative',
      ...rest.style
    }}
    {...rest}
  />
);

const parkingDictionary = { without: 0, single: 1, double: 2 };

const ExtendedInfoDialog = ({ data }: { data: TransactionData }) => {
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const ImageComponent = useMemo(() => data && DialogImage.bind(null, { src: data.image }), [data]);
  if (!data) return null;
  return (
    <Grid container height='fit-content' justifyItems='center' py={2}>
      <Grid item xs={7} display='flex' justifyContent='center'>
        <Card style={{ height: '100%', width: '100%' }}>
          <CardContent component={ImageComponent} />
          <CardContent
            style={{
              height: '50px',
              padding: '0.2rem 80px',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'flex-start'
            }}
          >
            <Button style={{ width: '50px', height: '50px' }}>
              <ImageComponent style={{ width: '100%', height: '50px' }} />
            </Button>
            <Button style={{ width: '50px', height: '50px' }}>
              <ImageComponent style={{ width: '100%', height: '100px' }} />
            </Button>
            <Button style={{ width: '50px', height: '50px' }}>
              <ImageComponent style={{ width: '100%', height: '50px' }} />
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={5} container spacing={1} px={2}>
        <Grid item>
          <InfoDisplay
            data={abbreviateNumber(typeof data.price === 'string' ? stringToNumber(data.price) : data.price)}
            property='price'
          />
        </Grid>
        <Grid item>
          <InfoDisplay data={data.sqm} property='sqm' tooltip='Square meters' />
        </Grid>
        <Grid item>
          <InfoDisplay data={data.num_rooms} property='num_rooms' tooltip='Number of Rooms' />
        </Grid>
        <Grid item>
          <InfoDisplay data={data.floor} property='floor' />
        </Grid>
        <Grid item>
          <InfoDisplay data={data.num_floors} property='num_floors' tooltip='Number of floors' />
        </Grid>
        <Grid item>
          <InfoDisplay data={data.elevator} property='elevator' />
        </Grid>
        <Grid item>
          <InfoDisplay
            data={parkingDictionary[data.parking || 'without']}
            property='parking'
            tooltip='Parking spaces'
          />
        </Grid>
        <Grid item xs={12}>
          <Card onClick={() => setDescriptionOpen(!descriptionOpen)}>
            <CardHeader subheader='About this listing:' style={{ paddingBottom: 0.1 }} />
            <Collapse in={descriptionOpen} collapsedSize={80}>
              <CardContent style={{ paddingTop: 0.1 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit iusto vitae voluptates aliquid
                totam! Blanditiis similique quaerat sunt magnam laudantium voluptas error neque, debitis delectus natus
                illo aliquid exercitationem officia.
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

const RealEstate = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [state, setState] = useState<TransactionData[]>([]);
  const [dialogState, setDialogState] = useState(-1);

  useEffect(() => {
    MockAPI.fetch().then(setState);
  }, []);

  return (
    <>
      <Dialog open={dialogState !== -1} fullWidth fullScreen={fullScreen} onClose={() => setDialogState(-1)}>
        <ExtendedInfoDialog data={state[dialogState]} />
      </Dialog>
      <Grid
        style={{ maxWidth: '100%' }}
        container
        justifyContent='center'
        alignItems='flex-start'
        paddingTop={3}
        spacing={2}
      >
        {state.map((data, i) => (
          <Grid onClick={() => setDialogState(i)} key={i} item>
            <ListCard data={data} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default RealEstate;
