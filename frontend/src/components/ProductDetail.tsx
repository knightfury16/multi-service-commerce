// Product.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { BaseUrl } from '../Constants';
import axiosInstance from '../api';

interface ProductDetail {
    createdAt: string;
    id: number;
    name: string;
    numOfReviews: number;
    price: number;
    ratings: number;
    stock: number;
    updatedAt: string;
    userId: number;
  }


const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [myError, setMyError] = useState<string | null>(null);

  useEffect(() => {
    axiosInstance.get<ProductDetail>(`${BaseUrl}/api/products/${id}`)
      .then(response => {
        console.log("PRODUCT DETAIL:", response);
        setProduct(response.data);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 429) {
          setMyError("You have exceeded your request limit. Please try again later.");
        } else {
          setMyError("An error occurred while fetching product details.");
        }
        console.error('Error fetching product details:', error);
      });
  }, [id]);
  return (
    <div>
      {myError ? (
        <div style={{ color: 'red' }}>{myError}</div>
      ) : (
        product && (
          <div>
            <h1>{product.name}</h1>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>Ratings: {product.ratings}</p>
            <p>Number of Reviews: {product.numOfReviews}</p>
          </div>
        )
      )}
    </div>
  );
};

export default ProductDetail;
