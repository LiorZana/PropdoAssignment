import { InputAdornment, InputLabel, Slider, TextField, TextFieldProps, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import RealEstateStore from '@/stores/RealEstateStore';
type RangeTuple = UTILS.RangeTuple;
type Range = UTILS.Range;

const PriceSlider = observer(
  ({
    // priceValue,
    store
  }: {
    // priceValue: RangeTuple;
    store: RealEstateStore;
  }) => {
    const [sliderValue, setSliderValue] = useState<RangeTuple>([0, 0]);
    const { filters, getNumericDataRangeUnfiltered } = store;
    const { price: priceRange } = filters;

    const sharedTextFieldProps: TextFieldProps = {
      variant: 'standard',
      size: 'small',
      inputProps: { inputMode: 'numeric', pattern: '[0-9]*', style: { fontSize: 14 } },
      InputProps: {
        endAdornment: (
          <InputAdornment position='end'>
            <Typography fontSize='15px' pb='2px'>
              $
            </Typography>
          </InputAdornment>
        )
      }
    };
    const totalPriceRange = getNumericDataRangeUnfiltered('price');

    useEffect(() => {
      if (sliderValue[0] === 0 && sliderValue[1] === 0 && priceRange.min !== 0 && priceRange.max !== 0) {
        setSliderValue([priceRange.min, priceRange.max]);
      }
    }, [priceRange, sliderValue]);

    const onPriceChange = (_: any, value: number | number[]) => {
      if (!Array.isArray(value)) return;
      filters.set.price({ min: value[0], max: value[1] });
    };

    const onMinTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
      const isNaN = Number.isNaN(+e.target.value);
      const value = isNaN ? sliderValue[0] : Math.min(sliderValue[1], Math.max(priceRange.min, +e.target.value));
      setSliderValue(v => [value, v[1]]);
      filters.set.price({ max: filters.price.max, min: value });
    };

    const onMaxTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
      const isNaN = Number.isNaN(+e.target.value);
      const value = isNaN ? sliderValue[1] : Math.max(sliderValue[0], Math.min(priceRange.max, +e.target.value));
      setSliderValue(v => [v[0], value]);
      filters.set.price({ min: filters.price.min, max: value });
    };

    return (
      <div style={{ position: 'relative', padding: '0 0.6rem 1.5rem 0.6rem', marginBottom: '0.8rem' }}>
        <Slider
          valueLabelDisplay='auto'
          disableSwap
          min={totalPriceRange.min}
          max={totalPriceRange.max}
          step={100}
          value={sliderValue}
          onChange={(_, newVal) => setSliderValue(newVal as RangeTuple)}
          onChangeCommitted={onPriceChange}
        />
        <TextField
          {...sharedTextFieldProps}
          style={{ maxWidth: '4.5rem', position: 'absolute', left: 0, bottom: 0 }}
          value={sliderValue[0]}
          onChange={onMinTextFieldChange}
        />
        <TextField
          {...sharedTextFieldProps}
          style={{ maxWidth: '4.5rem', position: 'absolute', right: 0, bottom: 0 }}
          value={sliderValue[1]}
          onChange={onMaxTextFieldChange}
        />
      </div>
    );
  }
);

export default PriceSlider;
