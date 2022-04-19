import HoverCard from '@/components/HoverCard';
import { Card, CardActionArea, CardProps } from '@mui/material';
import { Interpolation, Theme } from '@emotion/react';
import React from 'react';

const SubInfoCard = ({ title, ...props }: { title?: string } & CardProps) => {
  const cardSx = { width: '45%', height: '100px', background: '#c8deff', ...props.sx };
  return (
    <HoverCard
      {...props}
      mouseEnterProps={{ elevation: 10, sx: { zIndex: 999, ...cardSx } }}
      mouseLeaveProps={{ elevation: 0, sx: { zIndex: 0, ...cardSx } }}
    >
      <CardActionArea color='secondary' sx={{ width: '100%', height: '100%', textAlign: 'center' }}>
        {title}
      </CardActionArea>
    </HoverCard>
  );
};

export default SubInfoCard;
