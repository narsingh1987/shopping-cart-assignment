import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface IBanner {
  bannerImageUrl: string;
  bannerImageAlt: string;
  isActive: boolean;
  order: number;
  id: string;
}

interface ICategory {
  name: string;
  key: string;
  description: string;
  enabled: boolean;
  order: number;
  imageUrl: string;
  id: string;
}

function Home(): JSX.Element {
  const [banners, setBanners] = useState<IBanner[]>();
  const [categories, setCategories] = useState<ICategory[]>();
  const apiURL = 'http://localhost:3000';

  const loadBanners = async (): Promise<void> => {
    try {
      const response = await axios.get(`${apiURL}/api/banner/getAll`);
      setBanners((await response).data);
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

  useEffect(() => {
    loadBanners()
      .then(() => {})
      .catch(() => {});

    loadCategories()
      .then(() => {})
      .catch(() => {});
  }, []);

  return (
    <>
      <div id="carouselBanner" className="carousel slide">
        {banners != null && banners.length > 0
          ? banners.map((banner, index) => {
              return (
                <div
                  className="carousel-indicators"
                  key={`slidebutton${index}`}
                >
                  <button
                    type="button"
                    data-bs-target="#carouselBanner"
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
                    className="carousel-item active"
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
      {categories != null && categories.length > 0
        ? categories.map((category, index) => {
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
                          <button>Explore fruit-and-veg </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })
        : ''}
    </>
  );
}

export default Home;
