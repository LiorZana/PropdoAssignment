import { InputAdornment, InputLabel, Slider, TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
type RangeTuple = UTILS.RangeTuple;

const PriceSlider = ({
  // priceValue,
  priceRange,
  onPriceChange,
  onPriceComponentChange
}: {
  // priceValue: RangeTuple;
  priceRange: RangeTuple;
  onPriceChange: (newPriceRange: RangeTuple) => void;
  onPriceComponentChange: (priceCom: number, component: 'min' | 'max') => void;
}) => {
  const [sliderValue, setSliderValue] = useState<RangeTuple>([0, 0]);

  const sharedTextFieldProps: TextFieldProps = {
    variant: 'standard',
    inputProps: { inputMode: 'numeric', pattern: '[0-9]*' },
    InputProps: { endAdornment: <InputAdornment position='end'>$</InputAdornment> }
  };

  useEffect(() => {
    if (sliderValue[0] === 0 && sliderValue[1] === 0) {
      setSliderValue(priceRange);
    }
  }, [priceRange, sliderValue]);

  const onMinTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isNaN = Number.isNaN(+e.target.value);
    const value = isNaN ? sliderValue[0] : Math.min(sliderValue[1], Math.max(priceRange[0], +e.target.value));
    setSliderValue(v => [value, v[1]]);
    onPriceComponentChange(value, 'min');
  };

  const onMaxTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isNaN = Number.isNaN(+e.target.value);
    const value = isNaN ? sliderValue[1] : Math.max(sliderValue[0], Math.min(priceRange[1], +e.target.value));
    setSliderValue(v => [v[0], value]);
    onPriceComponentChange(value, 'max');
  };

  return (
    <div style={{ position: 'relative', paddingBottom: '1.5rem' }}>
      <InputLabel>Filter listing prices</InputLabel>
      <Slider
        valueLabelDisplay='off'
        disableSwap
        min={priceRange[0]}
        max={priceRange[1]}
        step={1}
        value={sliderValue}
        onChange={(e, newVal) => setSliderValue(newVal as RangeTuple)}
        onChangeCommitted={(e, newVal) => onPriceChange(newVal as RangeTuple)}
      />
      <TextField
        {...sharedTextFieldProps}
        style={{ maxWidth: '6rem', position: 'absolute', left: 0, bottom: 0 }}
        value={sliderValue[0]}
        onChange={onMinTextFieldChange}
      />
      <TextField
        {...sharedTextFieldProps}
        style={{ maxWidth: '6rem', position: 'absolute', right: 0, bottom: 0 }}
        value={sliderValue[1]}
        onChange={onMaxTextFieldChange}
      />
    </div>
  );
};

export default PriceSlider;
