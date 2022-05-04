import axios from 'axios';
import { useEffect, useState } from 'react';

import { AccountBalance } from '../../types';

const App = () => {
  const ACCOUNT_BALANCES_URL = 'http://localhost:3000/accounts/balances';
  const ACCOUNT_BALANCES_NETWORK_TIMEOUT = 100000;
  const [accountBalances, setAccountBalances] = useState<AccountBalance[]>();
  const [
    fetchAccountBalancesErrorMessage,
    setFetchingAccountBalancesErrorMessage
  ] = useState('');

  useEffect(() => {
    const fetchAccountBalances = async () => {
      try {
        const accountBalancesResponse = await axios.get(ACCOUNT_BALANCES_URL, {
          timeout: ACCOUNT_BALANCES_NETWORK_TIMEOUT
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
      <div>
        <ul>
          {accountBalances?.map((accountBalance) => (
            <li key={accountBalance.id}>
              <div>
                <img
                  alt="profile"
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/488320/profile/profile-80.jpg"
                  className="list-item-image"
                />
              </div>
              <div>
                <h4>{accountBalance.name}</h4>
                <p>{accountBalance.totalBalance}</p>
              </div>
            </li>
          ))}
          {fetchAccountBalancesErrorMessage && (
            <p>{fetchAccountBalancesErrorMessage}</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;
