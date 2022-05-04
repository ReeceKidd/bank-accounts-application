import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
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
  // Add an error wrapper for 500.
  // Add a loading wrapper as well.
  const ACCOUNT_BALANCES_URL = 'http://localhost:3000/accounts/balances';
  const ACCOUNT_BALANCES_NETWORK_TIMEOUT = 100000;
  const [accountBalances, setAccountBalances] = useState<AccountBalance[]>();
  const [fetchAccountsLoading, setFetchAccountsLoading] = useState(false);
  const [
    fetchAccountBalancesErrorMessage,
    setFetchingAccountBalancesErrorMessage
  ] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<AccountBalance>();

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

  useEffect(() => {
    setSelectedAccount(accountBalances?.[0]);
  }, [accountBalances]);

  return fetchAccountsLoading ? (
    <Grid
      container
      spacing={20}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <CircularProgress />
    </Grid>
  ) : (
    <div style={{ backgroundColor: '#FAFBFC' }}>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Paper elevation={3}>
            <List>
              {accountBalances?.map((accountBalance, index) => (
                <ListItem
                  divider={index !== accountBalances.length - 1}
                  key={accountBalance.id}
                  alignItems="center"
                  selected={selectedAccount?.id === accountBalance.id}
                  onClick={() => {
                    setSelectedAccount(accountBalance);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={accountBalance.name}
                      src={`https://i.pravatar.cc/300?u=${accountBalance.id}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={accountBalance.name}
                    secondary={
                      <div style={{ justifyContent: 'space-between' }}>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {accountBalance.totalBalance}
                        </Typography>
                        <Typography
                          variant="caption"
                          style={{ marginLeft: 10 }}
                        >
                          {accountBalance.accountType}
                        </Typography>
                      </div>
                    }
                  />
                </ListItem>
              ))}
              {fetchAccountBalancesErrorMessage && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {fetchAccountBalancesErrorMessage}
                </Alert>
              )}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Card style={{ position: 'fixed', minWidth: '50%' }}>
            <CardHeader
              avatar={
                <Avatar
                  alt={selectedAccount?.name}
                  src={`https://i.pravatar.cc/300?u=${selectedAccount?.id}`}
                />
              }
              title={
                <Typography gutterBottom variant="h4">
                  {selectedAccount?.name}
                </Typography>
              }
            />
            <CardContent>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {selectedAccount?.accountType}
              </Typography>
              <Typography gutterBottom variant="h6">
                {selectedAccount?.totalBalance}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Contact</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
