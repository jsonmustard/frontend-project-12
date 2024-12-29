import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import App from './components/App';
import './i18n.js';
import './styles.scss';
import 'bootstrap';

const rollbarConfig = {
  accessToken: 'bd0ba53e1b4f4c8d9feddbb300b30c80',
  environment: 'testenv',
};

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
