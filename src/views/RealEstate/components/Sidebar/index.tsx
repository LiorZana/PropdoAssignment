import useOnScroll from '@/hooks/useOnScroll';
import RealEstateStore from '@/stores/RealEstateStore';
import { realEstateSortingOptions } from '@/stores/RealEstateStore/utils';
import { Box, Button, Collapse, Stack, SxProps, Theme, Typography, useMediaQuery } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { ReactNode, useMemo, useState } from 'react';
import PriceSlider from '../PriceSlider';
import RoomFilter from '../RoomFilter';
import SearchBox from '../SearchBox';
import SortBox from '../SortBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useColorMode } from '@/providers/theme';
import { useTheme } from '@emotion/react';
import SidebarResetFiltersButton from './SiderbarResetFiltersButton';

const SidebarSection = observer(
  ({
    children,
    title = 'Section title',
    first = false,
    last = false
  }: {
    children: ReactNode;
    title?: string;
    first?: boolean;
    last?: boolean;
  }) => {
    const [open, setOpen] = useState(first);
    const borderRadius = first ? '10px 10px 0 0' : last ? '0 0 1rem 1rem' : '0';
    const colorMode = useColorMode();
    const theme = useTheme();
    return (
      <Box
        sx={{
          borderColor: theme.palette.primary.main,
          backgroundColor: 'background.default',
          borderStyle: 'solid',
          borderRadius,
          borderWidth: '1px',
          boxShadow: '0 2px 2px 0px #333333ff',
          zIndex: 1
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
          sx={{
            textTransform: 'none',
            width: '100%',
            justifyContent: 'space-between',
            borderRadius: 'inherit',
            p: 1.5
          }}
          onClick={() => setOpen(!open)}
        >
          <Typography color={colorMode.mode === 'light' ? 'secondary.dark' : 'primary.main'}>{title}</Typography>
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

const RealEstateSidebar = observer(({ store }: { store: RealEstateStore }) => {
  const scrollPosition = useOnScroll();
  const { filters, filterOptions } = store;
  const setFilters = useMemo(() => filters.set, [filters]);
  const { states, cities, addresses } = filterOptions;
  return (
    <Stack
      component='form'
      sx={{
        px: { xs: 2, md: 0 },
        transition: 'all 0.5s ease-in-out',
        transitionDelay: '0.1s',
        transformOrigin: 'center',
        marginTop: { md: scrollPosition + 'px' },
        width: '100%',
        maxWidth: '100%',
        minWidth: 'fit-content',
        position: 'relative'
      }}
    >
      <SidebarResetFiltersButton />
      <SidebarSection first title='Search an address'>
        <SearchBox
          store={store}
          onStatesChange={setFilters.states}
          onCitiesChange={setFilters.cities}
          onAddressChange={setFilters.address}
          states={states}
          cities={cities}
          addresses={addresses}
        />
      </SidebarSection>
      <SidebarSection title='Filter prices'>
        <PriceSlider store={store} />
      </SidebarSection>
      <SidebarSection title='Filter No. of rooms'>
        <RoomFilter store={store} />
      </SidebarSection>
      <SidebarSection last title='Sort listings'>
        <SortBox
          defaultValue={0}
          onChange={e => store.setSortBy(+e.target.value as 0 | 1 | 2)}
          options={realEstateSortingOptions}
        />
      </SidebarSection>
    </Stack>
  );
});

export default RealEstateSidebar;
