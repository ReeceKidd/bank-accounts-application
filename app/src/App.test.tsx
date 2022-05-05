import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => render(<App />)).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(<App />);

      expect(() => unmount()).not.toThrow();
    });
  });
});
