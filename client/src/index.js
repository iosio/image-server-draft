import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import registerServiceWorker from './registerServiceWorker';
import { CapsuleProvider } from '@iosio/capsule';
import cx from 'classnames';

const Root = CapsuleProvider({
    theme: {},
    global_styles: ()=>({}),
    provide_to_props: {cx},
    provide_to_logic: {}
})(App);

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
