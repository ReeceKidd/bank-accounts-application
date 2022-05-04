export interface Account {
  id: number;
  name: string;
}

export interface Transaction {
  id: number;
  accountId: number;
  amount: number;
}

export interface AccountBalance {
  id: number;
  name: string;
  totalBalance: number;
}
