import Login from './pages/login';

import './global.css';

import SignUpForm from './pages/signup';
import ForgotPassword from './pages/forgotpassword';
import AppRouter from './routes';


function App() {
  return (
    // <Provider store={store}>
    // <PersistGate loading={null} persistor={persistor}>
    <AppRouter />
    // <Toaster />
    // </PersistGate>
    // </Provider>
  );
}

export default App;
