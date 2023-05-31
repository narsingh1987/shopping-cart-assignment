import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface IProduct {
  name: string;
  imageURL: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
  id: string;
}

function Product(): JSX.Element {
  console.log('Product component');

  const [products, setProducts] = useState<IProduct[]>([]);
  const params = useParams();
  const categoryId = params.categoryId ?? '';

  const apiURL =
    process.env.REACT_APP_API_URL != null
      ? process.env.REACT_APP_API_URL
      : 'http://localhost:3000';

  const loadProduct = async (): Promise<void> => {
    try {
      if (categoryId !== '') {
        const response = await axios.get(
          `${apiURL}/api/product/getByCategory/${categoryId}`
        );
        setProducts(await response.data);
      } else {
        const response = await axios.get(`${apiURL}/api/product/getAll`);
        setProducts(await response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderProducts = (products: IProduct[]): JSX.Element[] => {
    const content = [];
    const productsWithIndex: [{ product: IProduct | null; index: number }] = [
      { product: null, index: 0 },
    ];

    if (products.length > 0) {
      productsWithIndex.splice(0, 1);
      products.map((product, index) =>
        productsWithIndex.push({ product, index })
      );

      for (let i = 0; i < productsWithIndex.length; i = i + 4) {
        const subcontent = [];

        for (let j = 0; j < 4 && i + j < productsWithIndex.length; j++) {
          const product = productsWithIndex[i + j].product;

          subcontent.push(
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
              <div className="itemName">{product?.name}</div>
              <div className="img">
                <img
                  src={`${apiURL}/${product?.imageURL ?? ''}`}
                  alt={product?.name}
                ></img>
              </div>
              <div className="itemDetail">{product?.description}</div>
              <div className="row">
                <div className="col-xl-6 col-lg-6">
                  {`MRP Rs. ${product?.price.toString() ?? ''}`}
                </div>
                <div className="col-xl-6 col-lg-6">
                  <button>Buy Now</button>
                </div>
              </div>
            </div>
          );
        }

        content.push(<div className="row">{subcontent}</div>);
      }
    }

    return content;
  };

  useEffect(() => {
    loadProduct()
      .then(() => {})
      .catch(() => {});
  }, []);

  return (
    <div className="container">
      {products != null && products.length > 0 ? (
        <>{renderProducts(products)}</>
      ) : (
        ''
      )}
    </div>
  );
}

export default Product;
