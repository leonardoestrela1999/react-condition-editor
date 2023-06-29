import React, { useEffect, useState } from 'react';
import './App.css';
import StoreTable from '../components/StoreTable';
import StoreFilters from '../components/StoreFilters';
import Operator from '../domain/operator/Operator';
import Property from '../domain/property/Property';
import useStore from '../hooks/useStore';

function App() {
  const {products, properties} = useStore();

  // The values selected by the user
  const [currentProperty, setCurrentProperty] = useState<Property>();
  const [currentOperator, setCurrentOperator] = useState<Operator>();
  const [currentValue, setCurrentValue] = useState<string | string[]>();

  useEffect(() => {
      /* if(){

      } */
  }, [currentOperator, currentValue]);

  return (
    <div className="App">

      <StoreFilters 
        setCurrentProperty={setCurrentProperty}
        setCurrentOperator={setCurrentOperator}
        setCurrentValue={setCurrentValue}
        currentProperty={currentProperty}
        currentOperator={currentOperator}
        currentValue={currentValue}
      />

      <StoreTable products={products} properties={properties}/>
      
    </div>
  );
}

export default App;
