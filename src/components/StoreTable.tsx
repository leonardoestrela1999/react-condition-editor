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

function StoreTable() {
    const {products, properties} = useStore();

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