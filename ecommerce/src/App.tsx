import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import Home from './components/Home';
import Product from './components/Product';

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout></Layout>}>
            <Route index element={<Home></Home>}></Route>
            <Route
              path="/products/:categoryId?"
              element={<Product></Product>}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
