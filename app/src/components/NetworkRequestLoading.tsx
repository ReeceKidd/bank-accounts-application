import { CircularProgress, Grid } from '@mui/material';
import { PropsWithChildren } from 'react';

type Props = {
  loading: boolean;
};
const NetworkRequestLoading: React.FC<PropsWithChildren<Props>> = ({
  loading,
  children
}) => (
  <>
    {loading ? (
      <Grid
        container
        spacing={20}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <CircularProgress itemProp="circular-progress" />
      </Grid>
    ) : (
      children
    )}
  </>
);

export default NetworkRequestLoading;
