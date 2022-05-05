import { Grid, Paper } from '@mui/material';

import { AccountBalance } from '../../../types';
import UserInfo from './UserInfo';
import UsersList from './UserList';

interface Props {
  accountBalances?: AccountBalance[];
  selectedAccount?: AccountBalance;
  setSelectedAccount: (selectedAccount?: AccountBalance) => void;
}

const Dashboard = ({
  accountBalances,
  selectedAccount,
  setSelectedAccount
}: Props) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper elevation={3}>
          <UsersList
            accountBalances={accountBalances}
            selectedAccount={selectedAccount}
            setSelectedAccount={setSelectedAccount}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <UserInfo selectedAccount={selectedAccount} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
