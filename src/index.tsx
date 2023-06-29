import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {  MultiSelectTheme } from 'chakra-multiselect'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
})

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);