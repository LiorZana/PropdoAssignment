import { Button, InputAdornment, Slider, TextField, TextFieldProps, Tooltip, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import RealEstateStore from '@/stores/RealEstateStore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { css } from '@emotion/react';

type RangeTuple = UTILS.RangeTuple;

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

    const totalPriceRange = getNumericDataRangeUnfiltered('price');

    useEffect(() => {
      if (priceRange) {
        setSliderValue([priceRange.min, priceRange.max]);
      }
    }, [priceRange]);

    const onPriceChange = (_: any, value: number | number[]) => {
      if (!Array.isArray(value)) return;
      filters.set.price({ min: value[0], max: value[1] });
    };

    const onMinTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
      const isNaN = Number.isNaN(+e.target.value);
      const value = isNaN ? sliderValue[0] : Math.min(sliderValue[1], Math.max(priceRange.min, +e.target.value));
      filters.set.price({ max: filters.price.max, min: value });
    };

    const onMaxTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
      const isNaN = Number.isNaN(+e.target.value);
      const value = isNaN ? sliderValue[1] : Math.max(sliderValue[0], Math.min(priceRange.max, +e.target.value));
      filters.set.price({ min: filters.price.min, max: value });
    };

    const onResetClick = () => filters.set.price(totalPriceRange);

    return (
      <div>
        <div css={css({ position: 'relative', padding: '0 0.6rem 1.5rem 0.6rem', marginBottom: '0.8rem' })}>
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
            css={css({ maxWidth: '4.5rem', position: 'absolute', left: 0, bottom: 0 })}
            value={sliderValue[0]}
            onChange={onMinTextFieldChange}
          />
          <TextField
            {...sharedTextFieldProps}
            css={css({ maxWidth: '4.5rem', position: 'absolute', right: 0, bottom: 0 })}
            value={sliderValue[1]}
            onChange={onMaxTextFieldChange}
          />
        </div>
        <Tooltip
          placement='top'
          title='Reset price filter'
          componentsProps={{ tooltip: { sx: { backgroundColor: 'primary', color: 'text.secondary' } } }}
          PopperProps={{ popperOptions: { modifiers: [{ name: 'offset', options: { offset: [0, -10] } }] } }}
        >
          <Button onClick={onResetClick} css={css({ width: '100%' })} color='primary' size='small'>
            <RestartAltIcon />
          </Button>
        </Tooltip>
      </div>
    );
  }
);

export default PriceSlider;
