import { useTheme } from '@emotion/react';
import { Button } from '@mui/material';
import { css } from '@emotion/react';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

const SidebarResetFiltersButton = () => {
  const { md } = useTheme().breakpoints.values;
  return (
    <div
      css={css`
        position: absolute;
        top: 1rem;
        left: 100%;
        width: 3rem;
        border-radius: 0 5px 5px 0;
        #reset-filters-btn {
          transform: translateX(-80%);
        }

        @media screen and (min-width: ${md}px) {
          &:hover {
            #reset-filters-btn {
              transform: translateX(-10%);
            }
          }
        }
        @media screen and (max-width: ${md - 1}px) {
          top: initial;
          left: initial;
          bottom: 100%;
          right: 3.5rem;
          width: 3.5rem;
          border-radius: 5px 5px 0 0;
          #reset-filters-btn {
            transform: translateY(10%);
          }
        }
      `}
    >
      <Button
        id='reset-filters-btn'
        size='small'
        color='secondary'
        variant='contained'
        css={css`
          transition: transform 0.5s;
          min-width: 100%;
          justify-content: flex-end;
          border-radius: inherit;
          @media screen and (max-width: ${md - 1}px) {
            justify-content: center;
            padding-right: 0;
            padding-left: 0;
          }
        `}
      >
        <PlaylistRemoveIcon />
      </Button>
    </div>
  );
};

export default SidebarResetFiltersButton;
