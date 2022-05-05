import { TransactionData } from '@/mockAPI';
import { useTheme } from '@emotion/react';
import { capitalize, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { ReactNode } from 'react';
import { iconDictionary, parkingDictionary } from '../data';

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
  const Icon = property !== 'num_floors' ? iconDictionary[property] : iconDictionary[property](data);
  return (
    <ListItem disablePadding>
      <ListItemButton disableTouchRipple sx={{ display: 'flex', px: 2, cursor: 'auto' }}>
        <ListItemIcon sx={{ p: 0, height: '25px', minWidth: '40px', flex: '0 1 auto' }}>
          <Icon
            sx={{
              p: 0,
              boxShadow: '0px 1px 2px 0 grey',
              borderRadius: 1,
              color: palette.primary.dark
            }}
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

const InfoList = ({ data }: { data: TransactionData }) => {
  return (
    <List disablePadding style={{ width: '100%' }}>
      <InfoListItem data={data.price.toLocaleString('en') + '$'} property='price' />
      <InfoListItem data={data.sqm + 'm²'} property='sqm' tooltip='Building size' />
      <InfoListItem data={data.num_rooms} property='num_rooms' tooltip='Rooms' />
      <InfoListItem data={data.floor} property='floor' />
      <InfoListItem data={data.num_floors} property='num_floors' tooltip='Floors total' />
      <InfoListItem data={data.elevator} property='elevator' tooltip='Elevators' />
      <InfoListItem data={parkingDictionary[data.parking || 'without']} property='parking' tooltip='Parking spaces' />
    </List>
  );
};

export default InfoList;
