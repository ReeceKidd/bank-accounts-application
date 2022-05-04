import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { AccountBalance } from '../../types';

const App = () => {
  const ACCOUNT_BALANCES_URL = 'http://localhost:3000/accounts/balances';

  const [accountBalances, setAccountBalances] = useState<AccountBalance[]>();
  const [
    fetchAccountBalancesErrorMessage,
    setFetchingAccountBalancesErrorMessage
  ] = useState('');

  useEffect(() => {
    const fetchAccountBalances = async () => {
      try {
        const accountBalancesResponse = await axios.get(ACCOUNT_BALANCES_URL, {
          timeout: 100000
        });
        setAccountBalances(accountBalancesResponse.data.accountBalances);
      } catch (err) {
        setFetchingAccountBalancesErrorMessage((err as Error).message);
      }
    };
    fetchAccountBalances();
  }, []);
  return (
    <div className="App">
      {accountBalances?.map((accountBalance) => (
        <p key={accountBalance.id}>
          {accountBalance.name}-{accountBalance.totalBalance}
        </p>
      ))}
      {fetchAccountBalancesErrorMessage && (
        <p>{fetchAccountBalancesErrorMessage}</p>
      )}
    </div>
  );
};

export default App;
