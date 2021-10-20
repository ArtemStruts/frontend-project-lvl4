// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import ReactDOM from 'react-dom';
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const run = async () => {
  const vdom = await init();
  console.log(vdom);
  ReactDOM.render(vdom, document.getElementById('chat'));
};

run();

export default init;
