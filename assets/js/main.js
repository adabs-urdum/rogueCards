"use strict";

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

Array.prototype.getRandomValue = function(){
  return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.shuffle = function(){
  var j, x, i;
  for (i = this.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = this[i];
      this[i] = this[j];
      this[j] = x;
  }
  return this;
};

/* jshint ignore:start */
ReactDOM.render(<App />, document.getElementById('root'));
/* jshint ignore:end */
