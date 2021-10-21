import { renderWithProviders } from '../../__mocks__/helpers';
import Notification from '../../components/notification/Notification';

test('Notification', () => {
  const { asFragment } = renderWithProviders(<Notification />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        aria-live="assertive"
        class="z-50 fixed inset-0 flex px-4 py-6 pointer-events-none p-6 items-start"
      >
        <div
          class="w-full flex flex-col space-y-4 items-end"
        />
      </div>
    </DocumentFragment>
  `);
});
