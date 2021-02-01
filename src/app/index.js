import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';

import '../.././styles.css'

import { ChakraProvider } from "@chakra-ui/react"


import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faTrash, faObjectGroup, faCheck, faTimes, faWindowClose, faTasks, faCircle } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee, faTrash, faObjectGroup, faCheck, faTimes, faWindowClose, faTasks, faCircle)

ReactDOM.render(
    <ChakraProvider>
        <App />
    </ChakraProvider>,
    document.getElementById("app")
)
