import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import React from 'react';

import App from './App.jsx';

const root = document.getElementById('root');
const vdom = createRoot(root);
vdom.render(<App />);