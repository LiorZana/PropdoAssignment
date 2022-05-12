import ListingDialogStore from '@/stores/ListingDialogStore';
import { css } from '@emotion/react';
import { Grid, Card, CardContent, Button, CardMedia, Tooltip } from '@mui/material';
import { observer } from 'mobx-react-lite';

const ImagesDisplay = observer(({ store }: { store: ListingDialogStore }) => {
  const { selectedImageSrc } = store;
  return (
    <Grid item xs={12} sm={7} display='flex' justifyContent='center' minHeight='250px'>
      <Card
        elevation={3}
        css={css`
          height: 100%;
          width: 100%;
          border-radius: 5px 0 5px 0;
        `}
      >
        <Tooltip
          placement='bottom-start'
          componentsProps={{
            tooltip: {
              sx: { minWidth: 'fit-content', p: 0, m: 0, background: 'transparent' }
            }
          }}
          followCursor
          title={<img height='275px' width='auto' src={selectedImageSrc} alt='Listing preview' />}
        >
          <CardMedia
            image={selectedImageSrc}
            aria-label='Selected listing image'
            css={css`
              width: 100%;
              height: 65%;
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
            `}
          />
        </Tooltip>
        <CardContent
          css={css`
            height: 35%;
            display: flex;
            justify-content: center;
            align-items: center;
            :last-child {
              padding: 0;
            }
          `}
        >
          {store.mappedImages.map(({ buttonProps, isSelectedImage, src }) => (
            <Button
              css={css`
                width: 40px;
                height: 50px;
                padding: 0;
                margin: 0 0.2rem;
              `}
              {...buttonProps}
            >
              <CardMedia
                aria-label='Listing images'
                css={css`
                  width: 100%;
                  height: 40px;
                  position: relative;
                `}
                image={src}
              >
                {!isSelectedImage && (
                  <div
                    css={css`
                      position: absolute;
                      top: 0;
                      left: 0;
                      bottom: 0;
                      right: 0;
                      background-color: #16161652;
                    `}
                  />
                )}
              </CardMedia>
            </Button>
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
});

export default ImagesDisplay;
