import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import NetworkRequestLoading from './NetworkRequestLoading';

describe('NetworkRequestLoading', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(<NetworkRequestLoading loading={true} />)
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(<NetworkRequestLoading loading={true} />);

      expect(() => unmount()).not.toThrow();
    });
  });
  describe('Loading overlay', () => {
    it('should display circular progress when loading', async () => {
      const { root } = await renderer.create(
        <NetworkRequestLoading loading={true} />
      );

      const circularProgress = await root.findByProps({
        itemProp: `circular-progress`
      });

      expect(circularProgress).toBeDefined();
    });
    it('should not display error overlay when error message is undefined', async () => {
      const { root } = await renderer.create(
        <NetworkRequestLoading loading={false} />
      );

      const errorAlert = await root.findAllByProps({
        itemProp: `circular-progress`
      });
      expect(errorAlert.length).toEqual(0);
    });
  });
});
