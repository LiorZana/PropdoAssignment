// UTILS
import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';
import useOnScroll from '@/hooks/useOnScroll';
import { css, useTheme } from '@emotion/react';
// COMPONENTS
import PriceSlider from '../PriceSlider';
import RoomFilter from '../RoomFilter';
import SearchBox from '../SearchBox';
import SortBox from '../SortBox';
import SidebarButton from './SidebarButton';
import ButtonsContainer from './ButtonsContainer';
import SidebarSection from './SidebarSection';
import { Stack } from '@mui/material';
// ICONS
import ClearFiltersIcon from '@mui/icons-material/FilterListOffOutlined';
import DisableScrollIcon from '@mui/icons-material/MobiledataOff';
import EnableScrollIcon from '@mui/icons-material/UnfoldMore';
// STORE
import RealEstateStore from '@/stores/RealEstateStore';
import { realEstateSortingOptions } from '@/stores/RealEstateStore/utils';

const RealEstateSidebar = observer(({ store }: { store: RealEstateStore }) => {
  const scrollPosition = useOnScroll();
  const [lastScrollPos, setLastScrollPos] = useState(scrollPosition);
  const { filters, filterOptions, autoScrollState: autoScrollDisabled, clearFilters, toggleAutoScroll } = store;
  const setFilters = useMemo(() => filters.set, [filters]);
  const { states, cities, addresses } = filterOptions;

  const handleToggleAutoScroll = () => {
    setLastScrollPos(scrollPosition);
    toggleAutoScroll();
  };
  return (
    <Stack
      component='form'
      css={css`
        transition-property: all;
        transition-duration: 0.5s;
        transition-delay: 0.1s;
        transition-timing-function: ease-in-out;
        transform-origin: center;
        max-width: 100%;
        min-width: fit-content;
        position: relative;
      `}
      sx={{
        px: { xs: 2, md: 0 },
        marginTop: { md: (autoScrollDisabled ? lastScrollPos : scrollPosition) + 'px' }
      }}
    >
      {/* <SidebarResetFiltersButton onClick={() => store.clearFilters()} /> */}
      <ButtonsContainer>
        <SidebarButton onClick={() => clearFilters()} Icon={ClearFiltersIcon} title='Clear Filters' />
        <SidebarButton
          onClick={handleToggleAutoScroll}
          Icon={autoScrollDisabled ? EnableScrollIcon : DisableScrollIcon}
          title={`${autoScrollDisabled ? 'Enable' : 'Disable'} auto-scroll`}
        />
      </ButtonsContainer>
      <SidebarSection zIndex={2} first title='Search an address'>
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
