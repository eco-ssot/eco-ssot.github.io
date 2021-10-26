import { renderHook } from '@testing-library/react-hooks';

import { storeWrapper } from '../../__mocks__/helpers';
import useIsHistory from '../../hooks/useIsHistory';

test('should increment counter', () => {
  const { result } = renderHook(() => useIsHistory(), { wrapper: storeWrapper });
  expect(result.current).toBe(false);
});
