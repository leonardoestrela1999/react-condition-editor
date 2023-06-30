import React, { useState } from 'react';
import './App.css';
import ProductTable from '../components/ProductTable';
import Filters from '../components/Filters';
import Operator from '../domain/operator/Operator';
import Property from '../domain/property/Property';
import { PropertyType } from '../constants';
import Product from '../domain/product/Product';
import { datastore } from '../mocks/data';
import { Box } from '@chakra-ui/react';

function App() {
  const [products, setProducts] = useState<Product[]>(datastore.getProducts());
  const [properties] = useState<Property[]>(datastore.getProperties());
  const [operators] = useState<Operator[]>(datastore.getOperators());

  // The values selected by the user
  const [currentProperty, setCurrentProperty] = useState<Property | undefined>();
  const [currentOperator, setCurrentOperator] = useState<Operator | undefined>();
  const [currentValue, setCurrentValue] = useState<PropertyType | undefined>();

  const filtersProps = {
    products: products,
    properties: properties,
    operators: operators,
    setProducts: setProducts,
    setCurrentProperty: setCurrentProperty,
    setCurrentOperator: setCurrentOperator,
    setCurrentValue: setCurrentValue,
    currentProperty: currentProperty,
    currentOperator: currentOperator,
    currentValue: currentValue,
  }

  return (
    <div className="App">
      <Box  w='100%' p={4} >
        <Filters 
          filtersProps={filtersProps}
        />
        <ProductTable products={products} properties={properties}/>
      </Box>

    </div>
  );
}

export default App;
