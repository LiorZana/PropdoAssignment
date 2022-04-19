import { ChangeEvent } from 'react';
import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material';

const SortBox = ({
  options,
  defaultValue,
  onChange
}: {
  options: string[];
  defaultValue?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <FormControl>
        <FormLabel>Sort by</FormLabel>
        <RadioGroup defaultValue={defaultValue ?? null} onChange={onChange}>
          {options.map((option, i) => (
            <FormControlLabel key={i} value={i} label={option} control={<Radio />} />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default SortBox;
