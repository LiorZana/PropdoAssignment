import RoomIcon from '@mui/icons-material/MeetingRoom';
import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PriceIcon from '@mui/icons-material/PriceChange';
import ElevatorIcon from '@mui/icons-material/Elevator';
import LayersIcon from '@mui/icons-material/Layers';
import DimensionsIcon from '@/components/DimensionsIcon';
import ParkingIcon from '@mui/icons-material/DirectionsCarFilledTwoTone';
import { TransactionData } from '@/mockAPI';
import { ComponentType } from 'react';

export type IconDictionary = {
  [key in keyof Omit<TransactionData, 'id' | 'images' | 'num_floors'>]: ComponentType<any>;
} & {
  num_floors(floor: string | number): ComponentType<any>;
};
export const iconDictionary: IconDictionary = {
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
export const parkingDictionary = { without: 0, single: 1, double: 2 };
