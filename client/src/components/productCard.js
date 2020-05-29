import React, {useEffect, useContext} from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import {useParams, NavLink} from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { Loader } from './loader';

export const ProductCard = ({product}) => {
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const productId = useParams().id;
    const {token} = useContext(AuthContext);

    useEffect( () => {
        if (error) {
          message(error);
        }
        clearError();
      }, [error, clearError, message] );

    const deleteHandler = async event => {
        try {
            const data = await request(`/api/product/delete/${productId}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            });
            alert(data.message);
        } catch (e) {}
    }

    if (loading) {
        return(<Loader />);
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-2" />
                <div className="col-8">
                    <div class="card bg-primary">
                        <div class="card-body">
                            <h4 class="card-title text-center">Товар <strong>{product.name}</strong></h4>
                            <p class="card-text">
                                Описание: <strong>{product.description}</strong>
                            </p>
                            <p class="card-text">
                                Цена: <strong>{product.cost} руб.</strong>
                            </p>
                            <p class="card-text">
                                Создано: <strong>{new Date(product.date).toLocaleDateString()}</strong>
                            </p>
                            <p class="card-text">
                                Просмотры: <strong>{product.clicks}</strong>
                            </p>
                            <p class="card-text">
                                Продавец: <strong>{product.createdByNick}</strong>
                            </p>
                            <p class="card-text">
                                Номер телефона: <strong>{product.phoneNumber}</strong>
                            </p>
                            <button 
                            type='button' 
                            className='btn btn-danger butn' 
                            onClick={deleteHandler}
                            >
                                <NavLink className='text-light' to="/products" refresh="true">
                                    Delete
                                </NavLink>
                            </button>
                            <button 
                            type='button'
                            className='btn btn-warning butn'
                            >
                                <NavLink className='text-dark' to={`/editPage/${product._id}`}>
                                    Edit
                                </NavLink>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-2" />
            </div>
        </div>
    );
}