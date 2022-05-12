import { Button, ButtonProps } from '@mui/material';
import Link from '../Link';

const LinkButton = (props: Omit<ButtonProps, 'LinkComponent'>) => <Button LinkComponent={Link} {...props} />;
export default LinkButton;
