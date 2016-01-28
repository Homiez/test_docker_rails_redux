/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
// import io from 'socket.io-client';
import {Provider} from 'react-redux';
import {reduxReactRouter, ReduxRouter} from 'redux-router';

import getRoutes from './routes';
import makeRouteHooksSafe from './helpers/makeRouteHooksSafe';
import ActionCable from './helpers/ActionCable';
import { load as msgLoad } from './redux/modules/message';

const client = new ApiClient();

// Three different types of scroll behavior available.
// Documented here: https://github.com/rackt/scroll-behavior
const scrollableHistory = useScroll(createHistory);

const dest = document.getElementById('content');
const store = createStore(reduxReactRouter, makeRouteHooksSafe(getRoutes), scrollableHistory, client, window.__data);

/*
function initSocket() {
  const socket = io('', {path: '/ws'});
  // const socket = io('rails.docker:8000', {path: '/cable'});
  socket.on('news', (data) => {
    console.log(data);
    // socket.emit('my other event', { my: 'data from client' });
  });
  socket.on('msg', (data) => {
    console.log(data);
  });

  return socket;
}

// global.socket = initSocket();
 */

global.socket = new ActionCable().getConsumer().subscriptions.create('RoomChannel', {
  connected: function() {
    console.log('connect!');
  },
  disconnected: function() {},
  received: function(data) {
    console.log('ActionCable received');
    if (data) {
      console.log(data.message);
      store.dispatch(msgLoad(data.message));
    } else {
      console.log(data);
    }
  },
  all: function() {
    return this.perform('all', {});
  },
  speak: function(user, message) {
    console.log(message);
    return this.perform('speak', {
      user_name: user,
      message: message
    });
  }
});
function ttt() {
  // global.room.speak('from node');
  // global.room.all();
}
setTimeout(ttt, 2000);

const component = (
  <ReduxRouter routes={getRoutes(store)} />
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
  console.log('--------client.js:55------');
  console.log(dest);
  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
