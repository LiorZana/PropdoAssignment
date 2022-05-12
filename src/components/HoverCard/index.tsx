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
  const { onMouseEnter, onMouseLeave, ...hoverProps } = (function getHoverProps(): CardProps {
    if (isMouseOver) {
      if (mouseEnterElevation) {
        return { ...mouseEnterProps, elevation: mouseEnterElevation };
      }
      return { ...mouseEnterProps, raised: true };
    }
    if (mouseLeaveElevation) {
      return { ...mouseLeaveProps, elevation: mouseLeaveElevation };
    }
    return { ...mouseLeaveProps, raised: false };
  })();
  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = e => {
    setMouseOver(true);
    if (onMouseEnter) onMouseEnter(e);
  };
  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = e => {
    setMouseOver(false);
    if (onMouseLeave) onMouseLeave(e);
  };

  return <Card onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props} {...hoverProps} />;
};

export default HoverCard;
