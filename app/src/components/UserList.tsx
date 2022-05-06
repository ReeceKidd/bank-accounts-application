import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';

import { AccountBalance } from '../../../types';

interface Props {
  accountBalances?: AccountBalance[];
  selectedAccount?: AccountBalance;
  setSelectedAccount: (selectedAccount?: AccountBalance) => void;
}

const UserList = ({
  accountBalances,
  selectedAccount,
  setSelectedAccount
}: Props) => {
  if (!selectedAccount) {
    setSelectedAccount(accountBalances?.[0]);
  }
  return (
    <List>
      {accountBalances?.map((accountBalance, index) => (
        <ListItem
          itemProp={`user-list-item-${accountBalance.id}`}
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
                  component="span"
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
    </List>
  );
};

export default UserList;
