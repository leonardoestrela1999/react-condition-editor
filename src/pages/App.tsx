import React from 'react';
import './App.css';
import StoreTable from '../components/StoreTable';
import StoreFilters from '../components/StoreFilters';

function App() {
  return (
    <div className="App">
      <StoreFilters />
      <StoreTable />
    </div>
  );
}

export default App;
