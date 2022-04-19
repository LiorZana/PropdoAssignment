import { Tab, Tabs, Typography } from '@mui/material';
import { css } from '@emotion/react';
import TabPanel from '@/components/TabPanel';
import { useState } from 'react';
import { ViewState } from 'react-map-gl';
import MapTab, { MapTabProps } from './MapTab';
import ContactTab from './ContactTab';
import { observer } from 'mobx-react-lite';
import { ListingTabsStoreType } from '@/stores/ListingTabsStore';

const ExtraInfoTabs = observer(
  ({
    addressLocation,
    addressLabel,
    store
  }: Pick<MapTabProps, 'addressLocation' | 'addressLabel'> & { store: ListingTabsStoreType }) => {
    const [currentTab, setCurrentTab] = useState(0);
    const [viewState, setViewState] = useState<ViewState>({
      ...addressLocation,
      zoom: 10,
      bearing: 0,
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
      pitch: 0
    });
    console.log(store);

    return (
      <div>
        <Tabs variant='fullWidth' value={currentTab} onChange={(_, v) => setCurrentTab(v)}>
          <Tab label='About the property' />
          <Tab label='View on map' />
          <Tab label='Contact the publisher' />
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit iusto vitae voluptates aliquid totam!
            Blanditiis similique quaerat sunt magnam laudantium voluptas error neque, debitis delectus natus illo
            aliquid exercitationem officia.
          </Typography>
        </TabPanel>
        <TabPanel boxProps={{ p: 3 }} keepMounted value={currentTab} index={1}>
          <MapTab
            viewState={viewState}
            onChange={setViewState}
            addressLocation={addressLocation}
            addressLabel={addressLabel}
          />
        </TabPanel>
        <TabPanel keepMounted={false} value={currentTab} index={2}>
          <ContactTab />
        </TabPanel>
      </div>
    );
  }
);

export default ExtraInfoTabs;
