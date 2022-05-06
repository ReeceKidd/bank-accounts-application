import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography
} from '@mui/material';

import { AccountBalance } from '../../../types';
import Transactions from './Transactions';

interface Props {
  selectedAccount?: AccountBalance;
}

const UserInfo = ({ selectedAccount }: Props) => {
  return (
    <Card style={{ position: 'fixed', minWidth: '50%', minHeight: '20%' }}>
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
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {selectedAccount?.accountType}
        </Typography>
        <Typography gutterBottom variant="h6">
          {selectedAccount?.totalBalance}
        </Typography>
        {selectedAccount?.transactions &&
          selectedAccount.transactions.length > 0 && (
            <Transactions transactions={selectedAccount?.transactions} />
          )}
      </CardContent>
    </Card>
  );
};

export default UserInfo;
