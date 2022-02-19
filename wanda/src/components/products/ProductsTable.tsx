import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from '@chakra-ui/react'
import { IProducts } from '../../utils/TypeScript';
import { Link } from 'react-router-dom';

interface IProp{
    products: IProducts[]
}

const ProductsTable: React.FC<IProp> = ({ products }) => {
    return(
    <Table  colorScheme='black'>
    <TableCaption> Products </TableCaption>
    <Thead>
      <Tr>
        <Th>Title</Th>
        <Th> Price - Qty</Th>
        <Th >Actions</Th>
      </Tr>
    </Thead>
    <Tbody>
        {
            products.map(item =>(
                <Tr key={item._id}>
                <Td><Link to={`/shop/${item.slug}`}> {item.title} </Link> </Td>
                <Td>{item.price} - {item.quantityInStock}</Td>
                <Td >
                  <i className='bx bx-edit-alt text-blue-500 cursor-pointer px-4'></i>
                  <i className='bx bx-trash text-red-500 cursor-pointer'></i>
                </Td>
              </Tr>
            ))
        }
    </Tbody>
  </Table>
    )
}

export default ProductsTable;
