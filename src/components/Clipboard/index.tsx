import { Box, BoxProps } from '@mui/system';
import ClipboardJS from 'clipboard';
import { ElementType, forwardRef, useEffect, useRef } from 'react';

type withClipboardInnerProps<T extends ElementType> = Omit<BoxProps<T>, 'component'> & {
  clipboardOptions?: ClipboardJS.Options;
  onSuccess?(e: ClipboardJS.Event): void;
  onError?(e: ClipboardJS.Event): void;
};

const withClipboard = <T extends ElementType>(Component: T) =>
  forwardRef<Element, withClipboardInnerProps<T>>(
    ({ clipboardOptions: options, onSuccess, onError, ...props }, ref) => {
      const clipboard = useRef<ClipboardJS | null>(null);
      const isClipboardInit = useRef(false);
      useEffect(
        () => () => {
          clipboard.current && clipboard.current.destroy();
        },
        []
      );
      return (
        <Box
          ref={(bRef: Element) => {
            if (ref) {
              if (typeof ref === 'function') {
                ref(bRef);
              } else {
                ref.current = bRef;
              }
            }
            if (!isClipboardInit.current) {
              clipboard.current = new ClipboardJS(bRef, options);
              if (onSuccess) clipboard.current.on('success', onSuccess);
              if (onError) clipboard.current.on('error', onError);
              isClipboardInit.current = true;
            }
          }}
          component={Component}
          {...props}
        />
      );
    }
  );

export default withClipboard;
