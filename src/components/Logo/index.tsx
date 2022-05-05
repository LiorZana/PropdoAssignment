import logo from '/images/logo/logo.png';
import logoDarkMode from '/images/logo/logo-dark-mode.png';
import { css } from '@emotion/react';
import { useColorMode } from '@/providers/theme';

const Logo = () => {
  const { mode } = useColorMode();
  return (
    <div
      css={css`
        height: 3rem;
        width: 10rem;
        background-image: url(${mode === 'light' ? logo : logoDarkMode});
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
      `}
      //   style={{
      //     height: '3rem',
      //     width: '10rem',
      //     backgroundImage: `url(${logo})`,
      //     backgroundSize: '90%',
      //     backgroundPosition: 'center',
      //     backgroundRepeat: 'no-repeat'
      //   }}
    ></div>
  );
};

export default Logo;
