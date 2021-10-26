import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import LoginPage from '../../pages/login/LoginPage';

test('LoginPage', () => {
  const assignMock = jest.fn();
  window.location = { ...window.location, assign: assignMock };
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  assignMock.mockRestore();
});
