import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ToDo from './container/todo';
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <HashRouter>
            <Switch>
                <Route path="/" component={ToDo} />
                <Route path="/abc" component={ToDo} />
            </Switch>
        </HashRouter>
      </DndProvider>
    </Provider>,
  document.getElementById('root')
 );
