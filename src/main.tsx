import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import "./i18n.ts";
import { Provider } from "react-redux";
import { store } from './redux/Store';
import { BrowserRouter } from 'react-router-dom';  // ✅ Add this

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
          <Provider store={store}>
            <BrowserRouter> {/* ✅ Wrap App in BrowserRouter */}
              <App />
            </BrowserRouter>
          </Provider>   
    </React.StrictMode>
  );
} else {
  throw new Error("Root element not found");
}
