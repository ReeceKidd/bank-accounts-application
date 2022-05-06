import { render } from '@testing-library/react';
import { Transaction } from '../../../types';
import Transactions from './Transactions';

describe('Transactions', () => {
  const mockTransactions: Transaction[] = [
    { accountId: 1, amount: 10.0, id: 2 }
  ];

  describe('mounting', () => {
    it('should mount without error with selected account', () => {
      expect(() =>
        render(<Transactions transactions={mockTransactions} />)
      ).not.toThrow();
    });

    it('should unmount without error with selected account', () => {
      const { unmount } = render(
        <Transactions transactions={mockTransactions} />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
