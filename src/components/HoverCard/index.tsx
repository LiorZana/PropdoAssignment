import { Card, CardProps } from '@mui/material';
import { MouseEventHandler, useMemo, useState } from 'react';

const HoverCard = ({
  mouseEnterProps,
  mouseLeaveProps,
  mouseEnterElevation,
  mouseLeaveElevation,
  ...props
}: Omit<CardProps, 'elevation'> & {
  mouseEnterProps?: CardProps;
  mouseLeaveProps?: CardProps;
  mouseEnterElevation?: number;
  mouseLeaveElevation?: number;
}) => {
  const [isMouseOver, setMouseOver] = useState(false);
  const { onMouseEnter, onMouseLeave, ...cardProps } = useMemo(
    () => ({
      ...props,
      ...(isMouseOver
        ? mouseEnterElevation
          ? { ...mouseEnterProps, elevation: mouseEnterElevation }
          : mouseEnterProps
        : mouseLeaveElevation
        ? { ...mouseLeaveProps, elevation: mouseLeaveElevation }
        : mouseLeaveProps)
    }),
    [props, mouseEnterProps, mouseLeaveProps, mouseEnterElevation, mouseLeaveElevation, isMouseOver]
  );

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = e => {
    setMouseOver(true);
    if (onMouseEnter) onMouseEnter(e);
  };
  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = e => {
    setMouseOver(false);
    if (onMouseLeave) onMouseLeave(e);
  };

  return <Card onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...cardProps} />;
};

export default HoverCard;
