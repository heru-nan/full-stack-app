import React from 'react';
import ReactDOM from 'react-dom';
import {Main} from './components/Main';
import '../../styles.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faTrash, faObjectGroup, faCheck, faTimes, faWindowClose, faTasks, faCircle } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee, faTrash, faObjectGroup, faCheck, faTimes, faWindowClose, faTasks, faCircle)

ReactDOM.render(
    <Main />,
    document.getElementById("app")
)
