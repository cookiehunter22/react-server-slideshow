import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './Components/AppRouter/AppRouter';
// import registerServiceWorker from './registerServiceWorker';


ReactDOM.render((
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
), document.getElementById('root'))
// registerServiceWorker();
