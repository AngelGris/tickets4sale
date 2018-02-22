import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import apis from './Api'

ReactDOM.render(<App api={apis} />, document.getElementById('root'))
registerServiceWorker()