import RealEstateStore from '@/stores/RealEstateStore';
import { mapWithFalloff } from '@/utils';
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import HeightIcon from '@mui/icons-material/HeightRounded';
import { css } from '@emotion/react';

const RoomSelect = ({
  options,
  onChange,
  value,
  label
}: {
  options: number[];
  value: number;
  label: string;
  onChange?: (e: SelectChangeEvent<number>) => void;
}) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: flex-start;
        align-items: center;
      `}
    >
      <Typography fontWeight='500' width='4rem' mr={1}>
        {label}
      </Typography>
      <Select
        fullWidth
        size='small'
        renderValue={v => `${v} rooms`}
        onChange={onChange}
        value={value}
        disabled={!options.length}
        sx={{ my: 0.3 }}
      >
        {mapWithFalloff(
          options,
          (r, i) => (
            <MenuItem value={r} key={i}>
              {r}
            </MenuItem>
          ),
          <MenuItem value={value} key={0}>
            {value}
          </MenuItem>
        )}
      </Select>
    </div>
  );
};

const RangeArrow = () => {
  return (
    <div
      css={theme => css`
        position: relative;
        display: flex;
        align-items: center;
        ::before,
        ::after {
          content: 'Rooms';
          font-size: 0.65rem;
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          color: ${theme.palette.text.secondary};
        }
        ::before {
        }
        ::after {
          transform: rotateZ(180deg);
          margin-top: 55%;
        }
      `}
    >
      <HeightIcon
        fontSize='large'
        css={css`
          transform: rotateZ(90deg);
        `}
      />
    </div>
  );
};

const RoomFilter = observer(({ store }: { store: RealEstateStore }) => {
  const { filters } = store;
  const { rooms } = store.filterOptions;
  const minValue = rooms[0] ? Math.max(rooms[0], filters.rooms.min) : filters.rooms.min;
  const maxValue = rooms[rooms.length - 1] ? Math.min(rooms[rooms.length - 1], filters.rooms.max) : filters.rooms.max;

  const onRoomSelectChange = {
    min: (e: SelectChangeEvent<number>) => {
      filters.set.rooms(({ max }) => ({ min: +e.target.value, max }));
    },
    max: (e: SelectChangeEvent<number>) => {
      filters.set.rooms(({ min }) => ({ min, max: +e.target.value }));
    }
  };

  return (
    <div
      css={css`
        /* display: flex;
        justify-content: flex-start;
        align-items: center; */
        margin: 0.5rem 0;
      `}
    >
      <RoomSelect
        label='From:'
        value={minValue}
        onChange={onRoomSelectChange.min}
        options={rooms.filter(r => r <= filters.rooms.max)}
      />
      {/* <HeightIcon
        fontSize='large'
        css={css`
          transform: rotateZ(90deg);
        `}
      /> */}
      <RoomSelect
        label='To:'
        value={maxValue}
        onChange={onRoomSelectChange.max}
        options={rooms.filter(r => r >= filters.rooms.min)}
      />
    </div>
  );
});

export default RoomFilter;
