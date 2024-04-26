import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home';
import Products from './components/Products';
import NoPage from './components/NoPage';
import CreateForm from './components/CreateForm';

const testProduct = {
  name: "Monster Energy",
  price: 99,
  discount: 10,
  categoryId: 2,
  inStock: true,
  description: "Do not drink it!",
  image: null
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/create" element={<CreateForm />} />
          <Route path="products/edit/:id" element={<CreateForm />} />
          {/* <Route path="orders" element={<p>Orders</p>} /> */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;