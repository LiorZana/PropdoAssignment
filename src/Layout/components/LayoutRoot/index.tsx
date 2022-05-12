import { css } from '@emotion/react';
import React, { ReactNode } from 'react';

const LayoutRoot = ({ children }: { children: ReactNode }) => {
  return (
    <div
      css={css`
        min-height: inherit;
        min-width: inherit;
      `}
    >
      {children}
    </div>
  );
};

export default LayoutRoot;
