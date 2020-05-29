import React from 'react';

export const AllProductCard = ({product}) => {
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
                        </div>
                    </div>
                </div>
                <div className="col-2" />
            </div>
        </div>
    );
}