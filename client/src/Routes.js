import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import AllProductsPage from './pages/AllProductsPage';
import AllDetailPage from './pages/AllDetailPage';
import EditPage from './pages/EditPage';
import RegisterPage from './pages/RegisterPage';


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
           <Switch>
                <Route path='/allDetail/:id'>
                    <AllDetailPage />    
                </Route>               
                <Route path="/products" exact>
                   <ProductsPage />
                </Route>
                <Route path="/create" exact>
                   <CreatePage />
                </Route>
                <Route path="/detail/:id">
                   <DetailPage />
                </Route>
                <Route path="/all-products" exact>
                    <AllProductsPage />
                </Route>
                <Route path="/editPage/:id" exact>
                    <EditPage />
                </Route>
                <Redirect to="create" />
           </Switch> 
        );
    }

    return (
        <Switch>
            <Route path="/auth" exact>
                <AuthPage />
            </Route>
            <Route path="/register" exact> 
                <RegisterPage />
            </Route>
            <Route path="/">
                <MainPage />
            </Route>
            <Redirect to="auth" />
        </Switch>
    );
}