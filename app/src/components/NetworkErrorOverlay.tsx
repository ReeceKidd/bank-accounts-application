import { Alert, AlertTitle, Grid } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type Props = {
  errorMessage: string;
};
const NetworkErrorOverlay: FC<PropsWithChildren<Props>> = ({
  errorMessage,
  children
}) => (
  <>
    {errorMessage ? (
      <Grid
        container
        spacing={20}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Alert itemProp="error-alert" severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorMessage} <strong> Please refresh the page</strong>
        </Alert>
      </Grid>
    ) : (
      children
    )}
  </>
);

export default NetworkErrorOverlay;
