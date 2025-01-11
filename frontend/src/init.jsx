import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import App from './components/App';
import './i18n.js';
import './styles.scss';
import 'bootstrap';

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: 'testenv',
};

console.log(import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN)

const init = async () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
);

export default init;
