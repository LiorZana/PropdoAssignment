import { TransactionData } from '@/mockAPI';
import {
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconProps,
  SvgIconProps,
  Tooltip,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import LayersIcon from '@mui/icons-material/Layers';
import RoomIcon from '@mui/icons-material/MeetingRoom';
import PriceIcon from '@mui/icons-material/PriceChange';
import DimensionsIcon from '@/components/DimensionsIcon';
import { useTheme } from '@emotion/react';
import HoverCard from '@/components/HoverCard';
import { abbreviateNumber, limitString } from '@/utils';
import { getAddressLabel } from '../../utils';
import { ComponentType } from 'react';

const DataDisplay = ({
  Icon,
  tooltip,
  label
}: {
  Icon: ComponentType<SvgIconProps> | ComponentType<IconProps>;
  label: string;
  tooltip: string;
  postfix?: string;
}) => {
  const theme = useTheme();
  const currColor = theme.palette.secondary[theme.palette.mode === 'light' ? 'dark' : 'light'];
  return (
    <Box display='flex' flexDirection='column' alignItems='center' width='fit-content' borderRadius={2}>
      <Tooltip
        componentsProps={{
          tooltip: {
            style: { backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText }
          }
        }}
        title={tooltip}
      >
        <Icon style={{ color: currColor }} />
      </Tooltip>
      <Typography variant='subtitle2' color={theme.palette.getContrastText(theme.palette.background.paper)}>
        {label}
      </Typography>
    </Box>
  );
};

const getFloorText = (floor: number) => {
  if (floor === undefined || Number.isNaN(floor)) {
    return 'Unknown';
  }
  const floorStr = floor.toFixed(0);
  const lastDigit = +floor.toString()[floorStr.length - 1];

  switch (lastDigit) {
    case 0:
      return 'Ground floor';
    case 1:
      return floor + 'st floor';
    case 2:
      return floor + 'nd floor';
    case 3:
      return floor + 'rd floor';
    default:
      return floor + 'th floor';
  }
};

const ListCard = ({ data }: { data: TransactionData }) => (
  <HoverCard
    mouseEnterElevation={6}
    mouseLeaveElevation={2}
    style={{ width: '320px', height: '220px', cursor: 'pointer' }}
  >
    <CardMedia aria-label='Listing image' style={{ width: '100%', height: '120px' }} image={data.images[0]} />
    <Divider />
    <Tooltip title={getAddressLabel(data.address)}>
      <div style={{ width: '100%' }}>
        <Typography sx={{ pl: 1 }} variant='overline'>
          {limitString(getAddressLabel(data.address), 38, true)}
        </Typography>
      </div>
    </Tooltip>

    {/* <Typography>{data.price}</Typography> */}
    <CardContent
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        pt: 1
      }}
    >
      <DataDisplay Icon={DimensionsIcon} label={`${data.sqm}m²`} tooltip='Building size in Square Meters' />
      <Divider flexItem orientation='vertical' />
      <DataDisplay Icon={LayersIcon} label={getFloorText(+data.floor)} tooltip={`Out of ${data.num_floors} floors`} />
      <Divider flexItem orientation='vertical' />
      <DataDisplay Icon={RoomIcon} label={`${data.num_rooms} rooms`} tooltip='Rooms (incl. living room)' />
      <Divider flexItem orientation='vertical' />
      <DataDisplay Icon={PriceIcon} label={`${abbreviateNumber(data.price)}$`} tooltip='Price in US Dollars' />
    </CardContent>
  </HoverCard>
);

export default ListCard;
