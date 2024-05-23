// Product.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../Constants';
import { Product } from './Products';

interface DataShape {
    count: string;
    product: Product;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get<DataShape>(`${BaseUrl}/api/products/${id}`)
      .then(response => {
        setProduct(response.data.product);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  return (
    <div>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <p>Price: {product.price}</p>
          {/* Add order button */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
