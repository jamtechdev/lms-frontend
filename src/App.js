import { Provider } from 'react-redux';
import './global.css';
import AppRouter from './routes';
import { Toaster } from 'react-hot-toast';
import { persistor, store } from './_store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
          <Toaster />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
