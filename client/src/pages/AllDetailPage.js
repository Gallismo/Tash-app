import React, { useState, useCallback, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';
import {Loader} from '../components/loader';
import {AllProductCard} from '../components/allProductCard';

function AllDetailPage() {
  const {request, loading} = useHttp();
  const [product, setProduct] = useState(null);
  const productId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/product/${productId}`, 'GET', null);
      setProduct(fetched);
    } catch (e) {

    }
  }, [productId, request]);

  useEffect( () => {
    getLink();
  }, [getLink]);

  if (loading) {
    return(
      <Loader />
    );
  }

  return (
    <div className='page-comp'>
      {!loading && product && <AllProductCard product={product} />}
    </div>
  );
}

export default AllDetailPage;