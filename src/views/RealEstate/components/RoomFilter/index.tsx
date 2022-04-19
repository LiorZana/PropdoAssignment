import { filterMap } from '@/utils';
import { FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';

const RoomSelect = () => {
  return (
    <Select>
      <MenuItem>a</MenuItem>
    </Select>
  );
};

interface RoomFilterProps {
  rooms: number[];
}

const RoomFilter = ({ rooms = [1] }: RoomFilterProps) => {
  const [minRooms, setMinRooms] = useState(0);
  const [maxRooms, setMaxRooms] = useState(0);

  const maxRoomsArr = rooms.filter(r => r > (minRooms || rooms[0]));

  useEffect(() => {
    if (!minRooms && rooms[0]) {
      setMinRooms(rooms[0]);
    }
  }, [rooms, minRooms]);

  return (
    <Grid container minWidth='100%' justifyContent='space-between'>
      {/* <Grid item xs={12} md={5}>
        {!!rooms.length && (
          <Select
            fullWidth
            renderValue={v => `${v} rooms`}
            onChange={e => setMinRooms(+e.target.value)}
            value={minRooms || rooms[0]}
          >
            {rooms.map((r, i) => (
              <MenuItem value={r} key={i}>
                {r}
              </MenuItem>
            ))}
          </Select>
        )}
      </Grid>
      <Grid item xs={12} md={5}>
        {!!rooms.length && (
          <Select
            fullWidth
            renderValue={v => `${v} rooms`}
            onChange={e => setMinRooms(+e.target.value)}
            value={maxRooms || rooms[0]}
          >
            {maxRoomsArr.map((r, i) => (
              <MenuItem value={r} key={i}>
                {r}
              </MenuItem>
            ))}
          </Select>
        )}
      </Grid> */}
    </Grid>
  );
};

export default RoomFilter;
