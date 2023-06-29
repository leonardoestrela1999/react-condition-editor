import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import useStore from '../hooks/useStore';
import Product from '../domain/product/Product';
import Property from '../domain/property/Property';

interface StoreTableProps {
    products: Product[];
    properties: Property[];
}

function StoreTable({products, properties}: StoreTableProps) {
    return(
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                <Tr>
                    {properties.map(property => 
                        <Th>{property.name}</Th>
                    )}
                </Tr>
                </Thead>
                <Tbody>
                {products.map(product =>
                    <Tr>
                        {product.property_values.map(propertyValue => 
                            <Td>{propertyValue.value}</Td>
                        )}
                    </Tr>
                )}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default StoreTable;