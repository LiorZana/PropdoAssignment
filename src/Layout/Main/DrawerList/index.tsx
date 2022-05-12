import { Button, css, Divider, List, ListItem, SvgIconProps } from '@mui/material';
import { createElement } from 'react';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import MapIcon from '@mui/icons-material/Map';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import navButtons, { NavButton } from '../navButtons';

const icons = { Listings: MapsHomeWorkIcon, Map: MapIcon };
const NavIcon = ({ label, ...rest }: { label: NavButton['label'] } & Omit<SvgIconProps, 'component'>) =>
  createElement(icons[label], rest);

export interface DrawerListProps {
  onClose?(): void;
}

const DrawerList = ({ onClose }: DrawerListProps) => {
  return (
    <List disablePadding sx={{ position: 'relative', mt: 1 }}>
      <Button
        name='Close menu button'
        onClick={onClose}
        size='small'
        css={css`
          position: absolute;
          top: 0;
          right: 0;
          border-radius: 2px 0 0 2px;
          left: 50%;
        `}
      >
        <ArrowBackIcon />
      </Button>
      <Divider flexItem sx={{ color: 'black', marginTop: '3rem' }} />
      {navButtons.map(({ label, href }, i) => (
        <ListItem key={i} disableGutters disablePadding>
          <Button
            css={css`
              width: 100%;
              padding: 0.5rem 1rem;
              justify-content: flex-start;
              border-radius: 0;
            `}
            startIcon={<NavIcon color='action' label={label} />}
          >
            {label}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default DrawerList;
