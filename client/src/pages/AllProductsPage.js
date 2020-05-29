import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';
import {Loader} from '../components/loader';
import {AllProductsList} from '../components/allProductsList';

function AllProductsPage() {
  const [products, setProducts] = useState([]);

  const {loading, request} = useHttp();


  const {token} = useContext(AuthContext);

  const fetchProducts = useCallback( async () => {
    try {
      const fetched = await request('/api/product/all', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setProducts(fetched);
    } catch(e) {}
  }, [token, request]);

  useEffect( () => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return(<Loader />);
  }

  return (
    <div className='page-comp'>
      {!loading && <AllProductsList products={products} />}
    </div>
  );
}

export default AllProductsPage;