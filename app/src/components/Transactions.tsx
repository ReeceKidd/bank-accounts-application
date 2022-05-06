import { List, ListItem, ListItemText, Paper } from '@mui/material';

import { Transaction } from '../../../types';

interface Props {
  transactions?: Transaction[];
}

const Transactions = ({ transactions }: Props) => {
  return (
    <Paper variant="outlined" itemProp="transactions">
      <List>
        {transactions?.map((transaction) => (
          <ListItem key={transaction.id}>
            <ListItemText
              primary={transaction.amount}
              secondary={transaction.id}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Transactions;
