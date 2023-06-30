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
import Product from '../domain/product/Product';
import Property from '../domain/property/Property';

interface StoreTableProps {
    products: Product[];
    properties: Property[];
}

function ProductTable({products, properties}: StoreTableProps) {
    return(
        <TableContainer data-testid="product-table" >
            <Table variant='simple'>
                <Thead>
                <Tr>
                    {properties.map(property => 
                        <Th data-testid="product-table-header">{property.name}</Th>
                    )}
                </Tr>
                </Thead>
                <Tbody>
                {products.map(product =>
                    <Tr data-testid="product-table-row">
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

export default ProductTable;