import { CSSObject, SerializedStyles } from '@emotion/react';
import { Box, BoxProps } from '@mui/material';
import { ElementType, forwardRef } from 'react';
import { css } from '@emotion/react';
import { contactTabItemHeight } from '@/views/RealEstate/utils';

export type ItemProps<T extends ElementType> = {
  css?: SerializedStyles;
  component?: T;
  align?: CSSObject['justifyContent'];
} & BoxProps<T>;

const Item = <T extends ElementType>({ align = 'center', ...props }: ItemProps<T>) => (
  <Box
    {...props}
    css={css`
      ${props.css}
      height: ${contactTabItemHeight}px;
      width: 100%;
      padding: 0 2rem 1rem 0;
      display: flex;
      flex-direction: column;
      justify-content: ${align};
    `}
  />
);
export default Item;
