import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import routes from './routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            {routes}
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
