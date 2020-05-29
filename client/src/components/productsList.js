import React from 'react';
import { Link } from 'react-router-dom';




export const ProductsList = ({products}) => {


    if(!products.length) {
        return <p className="text-center text-primary">Нет товаров</p>;
    }


    return(
    <table class="table table-dark table-hover">
        <thead>
        <tr>
            <th>№</th>
            <th>Name</th>
            <th>Description</th>
            <th>Cost</th>
            <th>Views</th>
        </tr>
        </thead>
        <tbody>
            {products.map( (product, index) => {
                return(
                    <tr key={product._id}>
                        <td><Link className='text-secondary' to={`/detail/${product._id}`}>{index + 1}</Link></td>
                        <td><Link className='text-secondary' to={`/detail/${product._id}`}>{product.name}</Link></td>
                        <td><Link className='text-secondary' to={`/detail/${product._id}`}>{product.description}</Link></td>
                        <td><Link className='text-secondary' to={`/detail/${product._id}`}>{product.cost} руб.</Link></td>
                        <td><Link className='text-secondary' to={`/detail/${product._id}`}>{product.clicks}</Link></td>
                    </tr>
                );
            })}
        </tbody>
    </table>
    );
}

