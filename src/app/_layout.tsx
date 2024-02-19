import { Provider } from 'react-redux';

import MainStackGroup from '@/app/(stack)/_layout';
import { store } from '@/features/store';

export default function Layout() {
  return (
    <Provider store={store}>
      <MainStackGroup />
    </Provider>
  );
}
