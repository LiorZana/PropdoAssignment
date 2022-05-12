import Link from '@/components/Link';
import Logo from '@/components/Logo';
import { Button } from '@mui/material';

const LogoButton = () => {
  return (
    <Button
      name='Home button'
      title='Real Estate home button'
      LinkComponent={Link}
      variant='text'
      href='/'
      color='secondary'
      sx={{
        py: 0,
        px: { xs: 0, md: 2 },
        borderRadius: 0
      }}
    >
      <Logo />
    </Button>
  );
};

export default LogoButton;
