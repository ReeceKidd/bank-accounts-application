import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { AccountBalance, AccountType } from '../../../types';
import UserList from './UserList';

describe('UserList', () => {
  const mockSelectedAccount: AccountBalance = {
    accountType: AccountType.Checking,
    id: 1,
    name: 'Tom Smith',
    totalBalance: 0,
    transactions: []
  };
  const mockAccountBalances = [mockSelectedAccount];
  const mockSetSelectedAccount = jest.fn();

  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(
          <UserList
            setSelectedAccount={mockSetSelectedAccount}
            selectedAccount={mockSelectedAccount}
          />
        )
      ).not.toThrow();
    });

    it('should unmount without error without', () => {
      const { unmount } = render(
        <UserList
          setSelectedAccount={mockSetSelectedAccount}
          selectedAccount={mockSelectedAccount}
        />
      );

      expect(() => unmount()).not.toThrow();
    });
  });

  describe('behavior', () => {
    it('should set selectedAccount to accountBalances[0] if selectedAccount is undefined', async () => {
      const { root } = await renderer.create(
        <UserList
          accountBalances={mockAccountBalances}
          setSelectedAccount={mockSetSelectedAccount}
        />
      );

      const userListItem = await root.findByProps({
        itemProp: `user-list-item-${mockAccountBalances[0].id}`
      });

      expect(userListItem).toBeDefined();
    });
  });
});
