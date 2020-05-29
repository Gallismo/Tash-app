import React, {useEffect, useContext, useState} from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import {useParams, NavLink} from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { Loader } from './loader';

export const EditCard = ({product}) => {
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const productId = useParams().id;
    const auth = useContext(AuthContext);

    const [form, setForm] = useState({
        name: `${product.name}`, description: `${product.description}`, cost: `${product.cost}`, phoneNumber: `${product.phoneNumber}`
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const editHandler = async event => {
        try {
            const data = await request(`/api/product/edit/${productId}`, 'PUT', {...form}, {
                Authorization: `Bearer ${auth.token}`
            });
            alert('Edited');
            throw data;
        } catch(e) {}
    }

    useEffect( () => {
        if (error) {
          message(error);
        }
        clearError();
      }, [error, clearError, message] );

    if (loading) {
        return(<Loader />);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2" />
                <div className="col-8">
                    <div class="card bg-primary">
                        <div class="card-body">
                            <h4 class="card-title text-center">Редактирование</h4>
                            <div className="form-group">
                                <label htmlFor="name" className="text">Введите название товара</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                id="name" 
                                placeholder={product.name} 
                                name="name" 
                                onChange={changeHandler} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description" className="text">Введите описание товара</label>
                                <textarea 
                                type="text" 
                                className="form-control" 
                                id="description" 
                                placeholder={product.description}
                                name="description" 
                                onChange={changeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cost" className="text">Введите цену товара</label>
                                <input 
                                type="number" 
                                className="form-control" 
                                id="cost" 
                                placeholder={product.cost}
                                name="cost" 
                                onChange={changeHandler} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber" className="text">Введите свой контактный телефон</label>
                                <input 
                                type="number" 
                                className="form-control" 
                                id="phoneNumber" 
                                placeholder={product.phoneNumber}
                                name="phoneNumber" 
                                onChange={changeHandler} 
                                />
                            </div>
                            <button 
                            className="btn btn-success" 
                            disabled={loading} 
                            onClick={editHandler}
                            >
                                <NavLink className="text-white" to={`/detail/${product._id}`} refresh="true">
                                    Сохранить
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