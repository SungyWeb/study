import React from 'react';
import ReactDom from 'react-dom';
import memoryUtils from './utils/memoryUtils';
import storageUtils from './utils/storageUtils';

import App from './App';

const user = storageUtils.getUser();
memoryUtils.user = user;

ReactDom.render(<App />, document.getElementById('root'));