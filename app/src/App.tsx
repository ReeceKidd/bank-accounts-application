import axios from 'axios';
import { useEffect, useState } from 'react';

import { AccountBalance } from '../../types';
import Dashboard from './components/Dashboard';
import NetworkErrorOverlay from './components/NetworkErrorOverlay';
import NetworkRequestLoading from './components/NetworkRequestLoading';

const App = () => {
  const ACCOUNT_BALANCES_URL = 'http://localhost:3000/accounts/balances';
  const ACCOUNT_BALANCES_NETWORK_TIMEOUT = 100000;
  const [accountBalances, setAccountBalances] = useState<AccountBalance[]>();
  const [selectedAccount, setSelectedAccount] = useState<AccountBalance>();
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
    <div style={{ backgroundColor: '#f6f9fc' }}>
      <NetworkRequestLoading loading={fetchAccountsLoading}>
        <NetworkErrorOverlay errorMessage={fetchAccountBalancesErrorMessage}>
          <Dashboard
            accountBalances={accountBalances}
            selectedAccount={selectedAccount}
            setSelectedAccount={setSelectedAccount}
          />
        </NetworkErrorOverlay>
      </NetworkRequestLoading>
    </div>
  );
};

export default App;
