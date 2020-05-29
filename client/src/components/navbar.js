import React, { useContext } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    }

   return(
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark fixed-top navi">
        <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" href="/">Колхоз Авито</a>
            </div>
            <ul className="nav navbar-nav">
                <li className='nav-item'><NavLink className='nav-link' to="/all-products">All Products</NavLink></li>
                <li className='nav-item'><NavLink className='nav-link' to="/create">Create</NavLink></li>
                <li className='nav-item'><NavLink className='nav-link' to="/products">My Products</NavLink></li>
                <li className='nav-item'><a className='nav-link' href="/" onClick={logoutHandler}>Выйти</a></li>
            </ul>
        </div>
    </nav>
  
   );
}