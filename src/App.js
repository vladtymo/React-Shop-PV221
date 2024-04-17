import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Layout from './components/Layout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<p>Home</p>} />
          <Route path="products" element={<p>Products</p>} />
          <Route path="orders" element={<p>Orders</p>} />
          <Route path="*" element={<p>Page Not Found!</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;