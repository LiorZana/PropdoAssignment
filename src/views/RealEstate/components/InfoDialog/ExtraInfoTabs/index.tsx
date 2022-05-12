import { Tab, Tabs, Typography } from '@mui/material';
import TabPanel from '@/components/TabPanel';
import MapTab from './MapTab';
import ContactTab from './ContactTab';
import { observer } from 'mobx-react-lite';
import ListingDialogStore from '@/stores/ListingDialogStore';

const ExtraInfoTabs = observer(({ store }: { store: ListingDialogStore }) => {
  const { currentTab } = store;

  return (
    <div>
      <Tabs variant='fullWidth' value={currentTab} onChange={(_, v) => (store.currentTab = v)}>
        <Tab label='About the property' />
        <Tab label='View on map' />
        <Tab label='Contact the publisher' />
      </Tabs>
      <TabPanel boxProps={{ sx: { py: 1, px: 2 } }} value={currentTab} index={0}>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit iusto vitae voluptates aliquid totam!
          Blanditiis similique quaerat sunt magnam laudantium voluptas error neque, debitis delectus natus illo aliquid
          exercitationem officia.
        </Typography>
      </TabPanel>
      <TabPanel boxProps={{ p: 3 }} keepMounted value={currentTab} index={1}>
        <MapTab store={store.mapTabStore} />
      </TabPanel>
      <TabPanel keepMounted={false} value={currentTab} index={2}>
        <ContactTab />
      </TabPanel>
    </div>
  );
});

export default ExtraInfoTabs;
