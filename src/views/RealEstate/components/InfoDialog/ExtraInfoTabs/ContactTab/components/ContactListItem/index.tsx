import { ListItem, ListItemButton, ListItemProps, Tooltip } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import withClipboard from '@/components/Clipboard';
import React from 'react';

const ListItemCopyButton = withClipboard(ListItemButton);

const ContactListItem = ({
  text,
  actionButtonTooltip,
  Icon,
  onActionButtonClick,
  actionButtonHref,
  ...rest
}: {
  text: string;
  actionButtonTooltip: string;
  Icon: SvgIconComponent;
  onActionButtonClick?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  actionButtonHref?: string;
} & ListItemProps) => {
  return (
    <ListItem disableGutters disablePadding {...rest}>
      <Tooltip
        PopperProps={{ popperOptions: { modifiers: [{ name: 'offset', options: { offset: [0, -10] } }] } }}
        title={actionButtonTooltip}
      >
        <ListItemButton
          {...(actionButtonHref && { href: actionButtonHref, component: 'a' })}
          onClick={onActionButtonClick}
          sx={{ display: 'flex', flex: '0 0 auto', py: 1.5, height: '100%', alignSelf: 'stretch' }}
        >
          <Icon fontSize='small' />
        </ListItemButton>
      </Tooltip>
      <Tooltip
        title='Copy to clipboard'
        PopperProps={{ popperOptions: { modifiers: [{ name: 'offset', options: { offset: [0, -10] } }] } }}
      >
        <ListItemCopyButton
          sx={{ py: 1.5, height: '100%' }}
          onSuccess={e => e.clearSelection()}
          data-clipboard-text={text}
        >
          {text}
        </ListItemCopyButton>
      </Tooltip>
    </ListItem>
  );
};

export default ContactListItem;
