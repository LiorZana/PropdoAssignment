import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

const OutletContainer = ({ appBarHeight, ...rest }: PropsWithChildren<{ appBarHeight: number | string }>) => {
  return (
    <div
      css={css`
        padding-top: ${appBarHeight};
        & > * {
          min-height: calc(100vh - ${appBarHeight});
        }
      `}
      {...rest}
    />
  );
};

export default OutletContainer;
