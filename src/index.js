import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { HashRouter } from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
     </Provider>
    , document.getElementById('root'));
// registerServiceWorker();
