import {
  Alert,
  AlertTitle,
  Avatar,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { AccountBalance } from '../../types';

const App = () => {
  const ACCOUNT_BALANCES_URL = 'http://localhost:3000/accounts/balances';
  const ACCOUNT_BALANCES_NETWORK_TIMEOUT = 100000;
  const [accountBalances, setAccountBalances] = useState<AccountBalance[]>();
  const [fetchAccountsLoading, setFetchAccountsLoading] = useState(false);
  const [
    fetchAccountBalancesErrorMessage,
    setFetchingAccountBalancesErrorMessage
  ] = useState('');

  useEffect(() => {
    const fetchAccountBalances = async () => {
      try {
        setFetchAccountsLoading(true);
        const accountBalancesResponse = await axios.get(ACCOUNT_BALANCES_URL, {
          timeout: ACCOUNT_BALANCES_NETWORK_TIMEOUT
        });
        setAccountBalances(accountBalancesResponse.data.accountBalances);
        setFetchAccountsLoading(false);
      } catch (err) {
        setFetchingAccountBalancesErrorMessage((err as Error).message);
        setFetchAccountsLoading(false);
      }
    };
    fetchAccountBalances();
  }, []);
  return (
    <Grid
      container
      spacing={20}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      {fetchAccountsLoading ? (
        <CircularProgress />
      ) : (
        <Paper elevation={3}>
          <List>
            {accountBalances?.map(({ name, totalBalance, id, accountType }) => (
              <div key={id}>
                <ListItem alignItems="center" key={id}>
                  <ListItemAvatar>
                    <Avatar
                      alt={name}
                      src={`https://i.pravatar.cc/300?u=${id}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={name}
                    secondary={
                      <div style={{ justifyContent: 'space-between' }}>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {totalBalance}
                        </Typography>
                        <Typography
                          variant="caption"
                          style={{ marginLeft: 10 }}
                        >
                          {accountType}
                        </Typography>
                      </div>
                    }
                    about={accountType}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            ))}
            {fetchAccountBalancesErrorMessage && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {fetchAccountBalancesErrorMessage}
              </Alert>
            )}
          </List>
        </Paper>
      )}
    </Grid>
  );
};

export default App;
