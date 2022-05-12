import { Button, SvgIconProps, Tooltip } from '@mui/material';
import { css, useTheme } from '@emotion/react';
import { ComponentType, MouseEventHandler } from 'react';

const SidebarButton = ({
  onClick,
  title,
  Icon
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  Icon: ComponentType<SvgIconProps>;
}) => {
  const { md } = useTheme().breakpoints.values;
  const name = `${title} button`;
  return (
    <Tooltip
      leaveDelay={0.1}
      disableInteractive
      title={title}
      PopperProps={{ popperOptions: { modifiers: [{ name: 'offset', options: { offset: [0, -10] } }] } }}
    >
      <div
        role='button'
        aria-label={name}
        css={css`
          button {
            transform: translateX(-80%);
          }
          @media screen and (min-width: ${md}px) {
            &:hover {
              button {
                transform: translateX(-10%);
              }
            }
          }
          @media screen and (max-width: ${md - 1}px) {
            width: 3.5rem;
            border-radius: 5px 5px 0 0;
            button {
              transform: translateY(10%);
            }
          }
        `}
      >
        <Button
          name={name}
          title={name}
          size='small'
          color='secondary'
          variant='contained'
          onClick={onClick}
          css={css`
            transition: transform 0.5s;
            min-width: 100%;
            justify-content: flex-end;
            border-radius: 0 5px 5px 0;
            @media screen and (max-width: ${md - 1}px) {
              border-radius: 5px 5px 0 0;
              justify-content: center;
              padding-right: 0;
              padding-left: 0;
            }
          `}
        >
          <Icon />
        </Button>
      </div>
    </Tooltip>
  );
};

export default SidebarButton;
