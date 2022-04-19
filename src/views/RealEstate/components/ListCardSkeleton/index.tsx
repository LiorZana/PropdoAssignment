import HoverCard from '@/components/HoverCard';
import { CardContent, Divider, Skeleton } from '@mui/material';
import React from 'react';

const ListCardSkeleton = () => {
  return (
    <HoverCard
      sx={{
        height: '200px',
        width: '320px',
        position: 'relative',
        p: 0,
        m: 0
      }}
    >
      <Skeleton width='100%' height={120} variant='rectangular' animation='wave' />
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', px: 7 }}>
        <Skeleton variant='rectangular' height={45} width={50} animation='wave' />
        <Divider flexItem orientation='vertical' />
        <Skeleton variant='rectangular' height={45} width={50} animation='wave' />
        <Divider flexItem orientation='vertical' />
        <Skeleton variant='rectangular' height={45} width={50} animation='wave' />
      </CardContent>
    </HoverCard>
  );
};

export default ListCardSkeleton;
