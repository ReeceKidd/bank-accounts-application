import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import NetworkErrorOverlay from './NetworkErrorOverlay';

describe('NetworkErrorOverlay', () => {
  const mockErrorMessage = 'error';
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(<NetworkErrorOverlay errorMessage={mockErrorMessage} />)
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <NetworkErrorOverlay errorMessage={mockErrorMessage} />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
  describe('Error overlay', () => {
    it('should display error overlay when error message is defined', async () => {
      const { root } = await renderer.create(
        <NetworkErrorOverlay errorMessage={mockErrorMessage} />
      );

      const errorAlert = await root.findByProps({
        itemProp: `error-alert`
      });

      expect(errorAlert).toBeDefined();
    });
    it('should not display error overlay when error message is undefined', async () => {
      const { root } = await renderer.create(
        <NetworkErrorOverlay errorMessage={''} />
      );

      const errorAlert = await root.findAllByProps({
        itemProp: `error-alert`
      });
      expect(errorAlert.length).toEqual(0);
    });
  });
});
