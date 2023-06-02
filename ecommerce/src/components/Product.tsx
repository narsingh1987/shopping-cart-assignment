import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { IProduct, ICategory } from '../redux/types';

function Product(): JSX.Element {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const params = useParams();
  const categoryId = params.categoryId ?? '';

  const apiURL: string =
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

  const loadCategories = async (): Promise<void> => {
    try {
      const response = await axios.get(`${apiURL}/api/category/getAll`);
      setCategories((await response).data);
    } catch (err) {
      console.error(err);
    }
  };

  const renderProducts = (products: IProduct[]): JSX.Element[] => {
    const content = [];
    const productsWithIndex: [{ product?: IProduct; index?: number }] = [{}];

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
            <div className="col-xl-3 col-lg-3 col-md-6 col-12">
              <div className="item-heading">{product?.name}</div>
              <div className="table-view">
                <div className="item-img">
                  <img
                    src={`${apiURL}/${product?.imageURL ?? ''}`}
                    alt={product?.name}
                  ></img>
                </div>
                <div className="item-detail">{product?.description}</div>
              </div>
              <div className="buy-price">
                <div className="row">
                  <div className="price-buy-mobile">{`Buy Now @ Rs.${
                    product?.price.toString() ?? ''
                  }`}</div>
                  <div className="mobile-hide">
                    <div className="col-md-6">
                      <div className="item-price">{`MRP Rs. ${
                        product?.price.toString() ?? ''
                      }`}</div>
                    </div>
                    <div className="col-md-6">
                      <div className="buy-btn">
                        <a href="javascript:void(0)">Buy Now </a>
                      </div>
                    </div>
                  </div>
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

    loadCategories()
      .then(() => {})
      .catch(() => {});
  }, [categoryId]);

  return (
    <section className="product-item">
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <div className="heading-menu">
              {categories != null && categories.length > 0
                ? categories.map((category, index) => {
                    return (
                      <Link
                        to={`/products/${category.id}`}
                        key={`category${index}`}
                      >
                        {category.name}
                      </Link>
                    );
                  })
                : ''}
            </div>
          </div>
          <div className="col-md-10">
            {products != null && products.length > 0 ? (
              <>{renderProducts(products)}</>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
