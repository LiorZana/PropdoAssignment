import { Button, Dialog, Grid, Paper, PaperProps, Theme, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { css } from '@emotion/react';
import ExtraInfoTabs from './ExtraInfoTabs';
import ListingDialogStore from '@/stores/ListingDialogStore';
import { observer } from 'mobx-react-lite';
import InfoList from './InfoList';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ImagesDisplay from './ImagesDisplay';

const ResponsivePaper = (props: PaperProps) => {
  return (
    <Paper
      {...props}
      css={css`
        justify-content: center;
        @media screen and (max-width: 600px) {
          padding-top: 5rem;
          overflow-y: hidden;
        }
        @media screen and (max-width: 400px) {
          padding-top: 10rem;
        }
        @media screen and (max-width: 250px) {
          padding-top: 13rem;
        }
      `}
    />
  );
};

const InfoDialog = observer(({ store }: { store: ListingDialogStore }) => {
  const {
    currentData: data,
    dialogTargetIndex: dialogTarget,
    isFirstTarget,
    isLastTarget,
    gotoPreviousDialogTarget,
    gotoNextDialogTarget,
    closeDialog
  } = store;
  const fullScreen = useMediaQuery<Theme>(({ breakpoints }) => breakpoints.down('sm'));

  return (
    <Dialog
      keepMounted
      disableEnforceFocus
      disablePortal
      open={dialogTarget !== -1}
      PaperProps={{
        css: css`
          justify-content: center;
        `
      }}
      fullWidth
      fullScreen={fullScreen}
      PaperComponent={ResponsivePaper}
    >
      <Grid container height='fit-content' maxWidth='100%' mx='auto' justifyContent='flex-start'>
        <Grid item xs={12}>
          <div
            css={theme => css`
              position: ${fullScreen ? 'absolute' : 'static'};
              top: 0;
              left: 0;
              height: ${fullScreen ? 60 : 40}px;
              width: 100%;
              display: flex;
              background-color: ${theme.palette.background.default};
            `}
          >
            <Button onClick={closeDialog}>
              <CloseIcon />
            </Button>
            <Button disabled={isFirstTarget} onClick={gotoPreviousDialogTarget}>
              <ArrowForwardIosIcon sx={{ transform: 'scaleX(-1)' }} />
            </Button>
            <Button disabled={isLastTarget} onClick={gotoNextDialogTarget}>
              <ArrowForwardIosIcon />
            </Button>
          </div>
        </Grid>
        <Grid item container xs={12} pb={1}>
          <ImagesDisplay store={store} />
          <Grid item xs={12} sm={5}>
            <InfoList data={data} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ExtraInfoTabs store={store} />
        </Grid>
      </Grid>
    </Dialog>
  );
});

export default InfoDialog;
