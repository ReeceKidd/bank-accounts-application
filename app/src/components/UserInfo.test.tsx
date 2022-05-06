import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { AccountBalance, AccountType } from '../../../types';
import UserInfo from './UserInfo';

describe('UserInfo', () => {
  const mockSelectedAccount: AccountBalance = {
    accountType: AccountType.Checking,
    id: 1,
    name: 'Tom Smith',
    totalBalance: 0,
    transactions: [{ accountId: 1, amount: 10.0, id: 2 }]
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
  describe('behavior', () => {
    it('should display transactions if there are transactions', async () => {
      const { root } = await renderer.create(
        <UserInfo selectedAccount={mockSelectedAccount} />
      );

      const transactions = await root.findByProps({
        itemProp: `transactions`
      });

      expect(transactions).toBeDefined();
    });
    it('should not display transactions if there are no transactions', async () => {
      const { root } = await renderer.create(
        <UserInfo
          selectedAccount={{ ...mockSelectedAccount, transactions: [] }}
        />
      );

      const transactions = await root.findAllByProps({
        itemProp: `transactions`
      });

      expect(transactions.length).toEqual(0);
    });
  });
});
