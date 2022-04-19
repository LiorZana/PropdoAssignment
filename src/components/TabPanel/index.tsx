import { Box } from '@mui/material';
import { BoxProps } from '@mui/system';
import { ComponentPropsWithRef, useEffect, useState } from 'react';

interface TabPanelProps extends ComponentPropsWithRef<'div'> {
  children?: React.ReactNode;
  index: number;
  value: number;
  keepMounted?: boolean;
  boxProps?: BoxProps;
}

const TabPanel = ({ children, value, index, keepMounted = false, boxProps, ...other }: TabPanelProps) => {
  const [didEnter, setDidEnter] = useState(false);
  useEffect(() => {
    if (!didEnter && value === index) {
      setDidEnter(true);
    }
  }, [didEnter, value, index]);

  return (
    <div role='tabpanel' hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {keepMounted && didEnter ? (
        <Box {...boxProps} sx={{ ...(boxProps?.sx || {}), display: value === index ? 'block' : 'none' }}>
          {children}
        </Box>
      ) : (
        value === index && <Box {...boxProps}>{children}</Box>
      )}
    </div>
  );
};

export default TabPanel;
