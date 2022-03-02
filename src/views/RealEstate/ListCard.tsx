import { TransactionData } from '@/mockAPI';
import { Card, CardContent, CardHeader, CardMedia, Dialog, Divider, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import RulerIcon from '@mui/icons-material/Straighten';
import LayersIcon from '@mui/icons-material/Layers';
import RoomIcon from '@mui/icons-material/MeetingRoom';
import { useTheme } from '@emotion/react';

type MainCardIcon = typeof RulerIcon | typeof LayersIcon | typeof RoomIcon;

const DataDisplay = ({ Icon, tooltip, data }: { Icon: MainCardIcon; data: string | number; tooltip: string }) => {
  const theme = useTheme();
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='fit-content'
      px={1.3}
      borderRadius={2}
      //   sx={{ borderColor: theme.palette.primary.light, borderWidth: '1px', borderStyle: 'solid' }}
    >
      <Tooltip
        componentsProps={{
          tooltip: {
            style: { backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText }
          }
        }}
        title={tooltip}
      >
        <Icon />
      </Tooltip>
      <Typography variant='subtitle2'>{data}</Typography>
    </Box>
  );
};

const ListCard = ({ data }: { data: TransactionData }) => {
  const [focused, setFocused] = useState(false);
  return (
    <Card
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
      style={{ width: '320px', height: '200px', cursor: 'pointer' }}
      raised={focused}
    >
      <CardMedia style={{ width: '100%', height: '120px' }} image={data.image} />
      <Divider />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          ...(!data.image && { height: '100%', '> *': { transform: 'scale(1.2)' } })
        }}
      >
        <DataDisplay Icon={RulerIcon} data={data.sqm} tooltip='Size in Square Meters' />
        <Divider flexItem orientation='vertical' />
        <DataDisplay Icon={LayersIcon} data={data.floor} tooltip='Floor' />
        <Divider flexItem orientation='vertical' />
        <DataDisplay Icon={RoomIcon} data={data.num_rooms} tooltip='Rooms' />
      </CardContent>
    </Card>
  );
};

export default ListCard;
