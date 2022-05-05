import * as yup from 'yup';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ContactListItem from './components/ContactListItem';
import PhoneIcon from '@mui/icons-material/Phone';
import SubInfoCard from './components/SubInfoCard';
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Slider,
  Stack,
  Typography,
  CircularProgress,
  Fade,
  SliderThumb,
  SliderTypeMap
} from '@mui/material';
import { css, useTheme } from '@emotion/react';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import Item from './components/Item';
import UserContactMeForm from './components/UserContactMeForm';
import SendMessageForm from './components/SendMessageForm';
import { contactTabItemHeight } from '@/views/RealEstate/utils';

type SliderThumbProps = NonNullable<SliderTypeMap['props']['componentsProps']>['thumb'];

const MarkLabel = ({ children }: { children: ReactNode }) => (
  <Button size='small'>
    <Typography letterSpacing='0' lineHeight='0.9rem' textAlign='left' variant='caption'>
      {children}
    </Typography>
  </Button>
);

const marks = [
  {
    value: 2,
    label: (
      <MarkLabel>
        Call or <br />
        email them
      </MarkLabel>
    )
  },
  {
    value: 1,
    label: (
      <MarkLabel>
        Send them <br />a message
      </MarkLabel>
    )
  },
  {
    value: 0,
    label: <MarkLabel>Call me back</MarkLabel>
  }
];

enum SliderState {
  CALL_ME_BACK = 0,
  CALL_THEM = 1,
  SEND_MESSAGE = 2
}

enum FormStages {
  PRE_SEND,
  LOADING,
  SENT
}

const ItemLoader = ({ children, loading }: { children: ReactNode; loading: boolean }) => (
  <>
    <Fade in={!loading}>
      <span>{children}</span>
    </Fade>
    <Fade in={loading} unmountOnExit>
      <div
        css={css`
          position: absolute;
          top: 0;
          bottom: 0;
          right: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <CircularProgress variant='indeterminate' size={75} />
      </div>
    </Fade>
  </>
);

const TriangleSliderThumb = ({ children, ...props }: SliderThumbProps = {}) => {
  const theme = useTheme();
  const size = '10px';
  return (
    <SliderThumb
      {...props}
      css={css`
        color: transparent;
        ::before {
          box-shadow: none;
        }
      `}
    >
      {children}
      <div
        style={{
          width: 0,
          height: 0,
          borderColor: `transparent transparent transparent ${theme.palette.primary.dark}`,
          borderWidth: `${size} 0 ${size} ${size}`,
          borderStyle: 'solid',
          borderRadius: 0
        }}
      />
    </SliderThumb>
  );
};

const ContactTab = () => {
  const [sliderState, setSliderState] = useState(SliderState.SEND_MESSAGE);
  const publishersName = useRef(Math.random() > 0.5 ? 'John' : 'Jane');
  const [sendMessageStage, setSendMessageStage] = useState(FormStages.PRE_SEND);
  const sendMessageTimeoutId = useRef<number | null>(null);

  useEffect(() => {
    if (sendMessageStage === FormStages.LOADING && !sendMessageTimeoutId.current) {
      sendMessageTimeoutId.current = window.setTimeout(() => setSendMessageStage(FormStages.SENT), 1500);
    }
    return () => {
      if (sendMessageTimeoutId.current) window.clearTimeout(sendMessageTimeoutId.current);
    };
  }, [sendMessageStage]);

  return (
    <div
      css={css`
        position: relative;
        height: 240px;
        overflow: hidden;
      `}
    >
      <div
        css={css`
          position: absolute;
          height: 75%;
          margin: auto 0;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          z-index: 999;
          width: 100%;
          display: flex;
          justify-content: flex-start;
          pointer-events: none;
          user-select: none;
        `}
      >
        <Slider
          css={css`
            pointer-events: auto;
            user-select: auto;
          `}
          marks={marks}
          value={sliderState}
          onChange={e => setSliderState(+(e.target as HTMLInputElement).value)}
          // components={{ Thumb: TriangleSliderThumb }}
          componentsProps={{
            rail: { style: { borderRadius: 0, width: '10px' } }
          }}
          min={0}
          max={2}
          track={false}
          orientation='vertical'
          step={1}
        />
      </div>
      <Stack
        css={css`
          width: 75%;
          margin-left: auto;
          transform: translateY(${(2 - sliderState) * -contactTabItemHeight}px);
          transition: transform 0.2s;
        `}
      >
        <Item>
          <List>
            <ListItem>
              <ListItemText primary={`Publisher's name: ${publishersName.current} Doe`} />
            </ListItem>
            <Divider variant='middle' flexItem />
            <ContactListItem
              Icon={PhoneIcon}
              text='+9720899999'
              actionButtonTooltip='Call the publisher'
              actionButtonHref='tel:+9720899999'
            />
            <Divider flexItem variant='middle' />
            <ContactListItem
              Icon={AlternateEmailIcon}
              text='ListingPublisher@realEstate.com'
              actionButtonTooltip='Email the publisher'
              actionButtonHref='mailto:ListingPublisher@realEstate.com'
            />
          </List>
        </Item>
        <Item
        // position='relative'
        >
          {/* <ItemLoader 
            loading={sendMessageStage === FormStages.LOADING}
          >*/}
          <SendMessageForm
          // didSubmit={sendMessageStage === FormStages.SENT}
          // onTakeMeClick={() => setSliderState(SliderState.CALL_ME_BACK)}
          // onSubmit={v => setSendMessageStage(FormStages.LOADING)}
          />
          {/* </ItemLoader> */}
        </Item>

        <Item>
          <UserContactMeForm />
        </Item>
      </Stack>
    </div>
  );
};

export default ContactTab;
