import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store from './slices/index.js';
import App from './App';
import './styles.scss';
import 'bootstrap';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));

const rollbarConfig = {
  accessToken: 'bd0ba53e1b4f4c8d9feddbb300b30c80',
  environment: 'testenv',
};

// eslint-disable-next-line functional/no-expression-statement
root.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>,
);
