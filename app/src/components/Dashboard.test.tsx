import { render } from '@testing-library/react';
import { AccountBalance, AccountType } from '../../../types';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  describe('mounting', () => {
    const mockSelectedAccount: AccountBalance = {
      accountType: AccountType.Checking,
      id: 1,
      name: 'Tom Smith',
      totalBalance: 0,
      transactions: []
    };
    const mockAccountBalances: AccountBalance[] = [mockSelectedAccount];
    it('should mount without error with only setSelectedAccount', () => {
      expect(() =>
        render(<Dashboard setSelectedAccount={jest.fn()} />)
      ).not.toThrow();
    });

    it('should mount without error with selectedAccount and accountBalances', () => {
      expect(() =>
        render(
          <Dashboard
            setSelectedAccount={jest.fn()}
            selectedAccount={mockSelectedAccount}
            accountBalances={mockAccountBalances}
          />
        )
      ).not.toThrow();
    });

    it('should unmount without error with only setSelectedAccount', () => {
      const { unmount } = render(<Dashboard setSelectedAccount={jest.fn()} />);

      expect(() => unmount()).not.toThrow();
    });

    it('should unmount without error with selectedAccount and accountBalances', () => {
      const { unmount } = render(
        <Dashboard
          setSelectedAccount={jest.fn()}
          selectedAccount={mockSelectedAccount}
          accountBalances={mockAccountBalances}
        />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
