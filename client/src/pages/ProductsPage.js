import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';
import {Loader} from '../components/loader';
import {ProductsList} from '../components/productsList';

function ProductsPage() {
  const [products, setProducts] = useState([]);

  const {loading, request} = useHttp();


  const {token} = useContext(AuthContext);

  const fetchProducts = useCallback( async () => {
    try {
      const fetched = await request('/api/product/my', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setProducts(fetched);
    } catch(e) {}
  }, [token, request]);

  useEffect( () => {
    fetchProducts();
  }, [fetchProducts]);

  console.log(products);
  if (loading) {
    return(<Loader />);
  }

  return (
    <div className='page-comp'>
      {!loading && <ProductsList products={products} />}
    </div>
  );
}

export default ProductsPage;