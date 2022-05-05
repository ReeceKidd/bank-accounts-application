import { render } from '@testing-library/react';
import { AccountBalance, AccountType } from '../../../types';
import UserInfo from './UserInfo';

describe('UserInfo', () => {
  const mockSelectedAccount: AccountBalance = {
    accountType: AccountType.Checking,
    id: 1,
    name: 'Tom Smith',
    totalBalance: 0
  };

  describe('mounting', () => {
    it('should mount without error with selected account', () => {
      expect(() =>
        render(<UserInfo selectedAccount={mockSelectedAccount} />)
      ).not.toThrow();
    });

    it('should mount without error without selected account', () => {
      expect(() => render(<UserInfo />)).not.toThrow();
    });

    it('should unmount without error with selected account', () => {
      const { unmount } = render(
        <UserInfo selectedAccount={mockSelectedAccount} />
      );

      expect(() => unmount()).not.toThrow();
    });

    it('should unmount without error without', () => {
      const { unmount } = render(<UserInfo />);

      expect(() => unmount()).not.toThrow();
    });
  });
});
