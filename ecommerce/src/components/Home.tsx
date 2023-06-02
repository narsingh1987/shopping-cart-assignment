import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ICategory, IBanner } from '../redux/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { categoryActions } from '../redux/category/slice';
import { bannerActions } from '../redux/banner/slice';
import { apiURL } from '../helpers/api_helper';

function Home(): JSX.Element {
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector((state) => state.category);
  const { banners } = useAppSelector((state) => state.banner);

  useEffect(() => {
    dispatch(bannerActions.getItems());

    dispatch(categoryActions.getItems());
  }, []);

  return (
    <>
      {/* -- Banners -- */}
      <div id="carouselExampleIndicators" className="carousel slide">
        {banners != null && banners.length > 0
          ? banners.map((banner, index) => {
              return (
                <div
                  className="carousel-indicators"
                  key={`slidebutton${index}`}
                >
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={index}
                    className={index === 0 ? 'active' : ''}
                    aria-label={`Slide ${index + 1}`}
                  ></button>
                </div>
              );
            })
          : ''}
        <div className="carousel-inner">
          {banners != null && banners.length > 0
            ? banners.map((banner, index) => {
                return (
                  <div
                    className={
                      index === 0 ? 'carousel-item active' : 'carousel-item'
                    }
                    key={`slideimage${index}`}
                  >
                    <img
                      src={`${apiURL}/${banner.bannerImageUrl}`}
                      className="d-block w-100"
                      alt={banner.bannerImageAlt}
                    ></img>
                  </div>
                );
              })
            : ''}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselBanner"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselBanner"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* -- Categories -- */}
      {categories != null && categories.length > 0
        ? categories.map((category, index) => {
            if (index % 2 === 0) {
              return (
                <section className="category" key={`categorysection${index}`}>
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div className="img">
                          <img
                            src={`${apiURL}/${category.imageUrl}`}
                            alt={category.name}
                          ></img>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div className="img-text">
                          <div className="heading">{category.name}</div>
                          <p>{category.description}</p>
                          <div className="btn">
                            <Link to={`/products/${category.id}`}>
                              Explore {category.key}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            } else {
              return (
                <section className="category" key={`categorysection${index}`}>
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div className="img-text">
                          <div className="heading">{category.name}</div>
                          <p>{category.description}</p>
                          <div className="btn">
                            <Link to={`/products/${category.id}`}>
                              Explore {category.key}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div className="img">
                          <img
                            src={`${apiURL}/${category.imageUrl}`}
                            alt={category.name}
                          ></img>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            }
          })
        : ''}
    </>
  );
}

export default Home;
