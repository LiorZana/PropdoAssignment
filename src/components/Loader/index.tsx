import { LinearProgress } from '@mui/material';

const Loader = () => {
  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <LinearProgress color='primary' />
    </div>
  );
};

export default Loader;
