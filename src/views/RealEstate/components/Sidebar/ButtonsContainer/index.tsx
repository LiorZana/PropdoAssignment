import React, { PropsWithChildren } from 'react';
import { css, useTheme } from '@emotion/react';

const ButtonsContainer = ({ children, spacing = '0.5rem' }: PropsWithChildren<{ spacing?: number | string }>) => {
  const { md } = useTheme().breakpoints.values;
  return (
    <div
      css={css`
        position: absolute;
        flex-direction: column;
        display: flex;
        top: 1rem;
        left: 100%;
        border-radius: 0 5px 5px 0;
        > div:not(:last-child) {
          margin-bottom: ${spacing};
          margin-right: 0;
        }
        /* #reset-filters-btn {
          transform: translateX(-80%);
        } */
        /* @media screen and (min-width: ${md}px) {
          &:hover {
            #reset-filters-btn {
              transform: translateX(-10%);
            }
          }
        } */
        @media screen and (max-width: ${md - 1}px) {
          flex-direction: row;
          top: initial;
          left: initial;
          bottom: 100%;
          right: 3.5rem;
          > div:not(:last-child) {
            margin-right: ${spacing};
            margin-bottom: 0;
          }
          border-radius: 5px 5px 0 0;
          /* #reset-filters-btn {
            transform: translateY(10%);
          } */
        }
      `}
    >
      {children}
    </div>
  );
};

export default ButtonsContainer;
