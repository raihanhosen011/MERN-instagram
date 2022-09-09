import React from 'react';
import ReactDOM from 'react-dom';
import 'react-multi-carousel/lib/styles.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import DataProvider from './redux/store';

ReactDOM.render(
    <Router>
       <DataProvider><App /></DataProvider>
    </Router>,
    document.getElementById('root')
);