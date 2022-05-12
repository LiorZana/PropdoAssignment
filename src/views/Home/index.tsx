import { css } from '@emotion/react';
import { CardActionArea, Typography } from '@mui/material';
import Link from '@/components/Link';
import HoverCard from '@/components/HoverCard';
import ListingsScreenShot from '/images/listing-screen-light.png';
import MapRouteScreenShot from '/images/map-route-screen-light.png';

const RouteCard = ({ title, href, backgroundImage }: { title?: string; href: string; backgroundImage: string }) => {
  return (
    <HoverCard
      mouseLeaveElevation={2}
      css={css`
        height: 300px;
        width: 40%;
        min-width: 200px;
        max-width: 400px;
        border-radius: 5px;
        background-image: url(${backgroundImage});
        background-size: cover;
        background-repeat: no-repeat;
      `}
    >
      <CardActionArea
        href={href}
        LinkComponent={Link}
        css={css`
          width: 100%;
          height: 100%;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <Typography
          sx={{ backgroundColor: 'background.paper' }}
          style={{ padding: '0.5rem 1rem', borderRadius: 5, boxShadow: '0 0 3px 0 black' }}
          variant='h4'
        >
          {title}
        </Typography>
      </CardActionArea>
    </HoverCard>
  );
};

const Home = () => {
  return (
    <div
      css={css`
        min-height: inherit;
        min-width: inherit;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        flex-wrap: wrap;
        @media screen and (max-width: 450px) {
          padding: 1rem;
          padding-top: 8rem;
          flex-direction: column;
          align-items: center;
        }
      `}
    >
      <RouteCard backgroundImage={ListingsScreenShot} href='/real-estate' title='Listings' />
      <div style={{ width: '30px', height: '10px' }} />
      <RouteCard backgroundImage={MapRouteScreenShot} href='/map' title='Map' />
      <Typography minWidth='100%' pt={1} pb={2} mt='auto'>
        * Temporary landing page
      </Typography>
    </div>
  );
};

export default Home;
