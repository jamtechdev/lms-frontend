import './global.css';
import AppRouter from './routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      {/* <Provider store={store}> */}
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <AppRouter />
      <Toaster />
      {/* </PersistGate>
    </Provider> */}
    </>
  );
}

export default App;
