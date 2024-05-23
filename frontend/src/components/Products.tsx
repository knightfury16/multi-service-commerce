// Products.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BaseUrl} from '../Constants'

export interface Product {
  id: number;
  name: string;
  price: number;
  createdAt: string;
  updatedAt: string;

  // Add other properties as needed
}

interface DataShape {
    count: string;
    products: Product[];
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get<DataShape>(`${BaseUrl}/api/products`)
      .then(response => {
        console.log("PRODUCTS:", response.data.products);
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <p>{product.name}</p>
            <p>{product.price}</p>
            {/* Add link to product detail */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
