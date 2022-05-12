import { useColorMode } from '@/providers/theme';
import { useTheme, css } from '@emotion/react';
import { Box, Button, Typography, Collapse } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { ReactNode, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SidebarSection = observer(
  ({
    children,
    title = 'Section title',
    first = false,
    last = false,
    zIndex = 1
  }: {
    children: ReactNode;
    title?: string;
    first?: boolean;
    last?: boolean;
    zIndex?: number;
  }) => {
    const [open, setOpen] = useState(first);
    const borderRadius = first ? '10px 10px 0 0' : last ? '0 0 1rem 1rem' : '0';
    const { mode: colorMode } = useColorMode();
    const theme = useTheme();
    return (
      <Box
        sx={{
          borderColor: theme.palette.primary.main,
          backgroundColor: 'background.default',
          borderStyle: 'solid',
          borderRadius,
          borderWidth: '1px',
          boxShadow: `0 ${first ? 0 : 2}px 2px 0px #333333ff`,
          zIndex
        }}
      >
        <Button
          // variant='outlined'
          endIcon={
            <ArrowBackIcon
              color='secondary'
              sx={{ transform: `rotateZ(${open ? '270' : '0'}deg)`, transition: 'transform 0.3s' }}
            />
          }
          css={css`
            text-transform: none;
            width: 100%;
            justify-content: space-between;
            border-radius: inherit;
            padding: 1.5;
          `}
          onClick={() => setOpen(!open)}
        >
          <Typography color={'text.' + (colorMode === 'light' ? 'disabled' : 'primary')} fontWeight={550}>
            {title}
          </Typography>
        </Button>
        <Collapse in={open}>
          <Box px={1} py={0.8}>
            {children}
          </Box>
        </Collapse>
      </Box>
    );
  }
);

export default SidebarSection;
