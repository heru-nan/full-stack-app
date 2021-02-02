import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';

import '../.././styles.css'

import { ChakraProvider } from "@chakra-ui/react"


import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck,faWindowClose} from '@fortawesome/free-solid-svg-icons'

library.add(faCheck,faWindowClose)

ReactDOM.render(
    <ChakraProvider>
        <App />
    </ChakraProvider>,
    document.getElementById("app")
)
