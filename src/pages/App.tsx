import React, { useEffect, useState } from 'react';
import './App.css';
import StoreTable from '../components/StoreTable';
import StoreFilters from '../components/StoreFilters';
import Operator from '../domain/operator/Operator';
import Property from '../domain/property/Property';
import { PropertyType } from '../constants';
import Product from '../domain/product/Product';
import { datastore } from '../mocks/data';

function App() {
  const [products, setProducts] = useState<Product[]>(datastore.getProducts());
  const [properties] = useState<Property[]>(datastore.getProperties());
  const [operators] = useState<Operator[]>(datastore.getOperators());

  // The values selected by the user
  const [currentProperty, setCurrentProperty] = useState<Property>();
  const [currentOperator, setCurrentOperator] = useState<Operator>();
  const [currentValue, setCurrentValue] = useState<PropertyType>();

  return (
    <div className="App">

      <StoreFilters 
        properties={properties}
        operators={operators}
        setProducts={setProducts}
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
