import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { IProduct, ICategory } from '../redux/types';
import { cartActions, ICartItem } from '../redux/cart/slice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { productActions } from '../redux/product/slice';
import { categoryActions } from '../redux/category/slice';
import { apiURL } from '../helpers/api_helper';

function Product(): JSX.Element {
  const params = useParams();
  const categoryId = params.categoryId ?? '';

  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.product);
  const { categories } = useAppSelector((state) => state.category);

  const buyNow = (product: IProduct): void => {
    const Item: ICartItem = { Id: product.id, Qty: 1 };
    dispatch(cartActions.addItem(Item));
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
            <div
              className="col-xl-3 col-lg-3 col-md-6 col-12"
              key={`product${product.id}`}
            >
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
                        <button onClick={() => buyNow(product)}>Buy Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        content.push(
          <div className="row" key={`category${i}`}>
            {subcontent}
          </div>
        );
      }
    }

    return content;
  };

  useEffect(() => {
    dispatch(
      categoryId !== ''
        ? productActions.getItemsByCategory(categoryId)
        : productActions.getItems()
    );

    dispatch(categoryActions.getItems());
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
