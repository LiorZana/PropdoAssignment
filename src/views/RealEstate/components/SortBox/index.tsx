import { ChangeEvent } from 'react';
import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { observer } from 'mobx-react-lite';

const SortBox = observer(
  ({
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
          <RadioGroup defaultValue={defaultValue ?? null} onChange={onChange}>
            {options.map((option, i) => (
              <FormControlLabel key={i} value={i} label={option} control={<Radio />} />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
);

export default SortBox;
