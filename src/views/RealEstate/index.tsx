import { Grid } from '@mui/material';
import { useEffect } from 'react';
import ListCard from './components/ListCard';
import InfoDialog from './components/InfoDialog';
import ListCardSkeleton from './components/ListCardSkeleton';
import { observer } from 'mobx-react-lite';
import RealEstateSidebar from './components/Sidebar';
import useRootStore from '@/hooks/useRootStore';

const RealEstate = observer(() => {
  const { realEstateStore, listingDialogStore } = useRootStore();
  const { isFetching } = realEstateStore;

  useEffect(() => {
    realEstateStore.fetchData();
  }, [realEstateStore]);

  return (
    <>
      <InfoDialog store={listingDialogStore} />
      <Grid
        container
        justifyContent='space-between'
        columnSpacing={{ xs: 0, md: 3 }}
        sx={{
          mt: { xs: 6, md: 2 },
          mx: '0 !important',
          pr: { xs: 1, md: 2 },
          pl: 1,
          maxWidth: { xs: '98%', md: '100%' }
        }}
      >
        <Grid item xs={12} md={3} xl={2}>
          <RealEstateSidebar store={realEstateStore} />
        </Grid>
        <Grid item xs={12} md={9} xl={10}>
          <Grid maxWidth='100%' container justifyContent='space-evenly' rowSpacing={3} columnSpacing={1} m={0}>
            {isFetching
              ? Array.from(Array(20)).map((_, i) => (
                  <Grid item key={i}>
                    <ListCardSkeleton />
                  </Grid>
                ))
              : realEstateStore.filtered.map((data, i) => (
                  <Grid
                    onClick={() => {
                      console.log('index', i);
                      listingDialogStore.dialogTargetIndex = i;
                    }}
                    key={i}
                    item
                  >
                    <ListCard data={data} />
                  </Grid>
                ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
});

export default RealEstate;
