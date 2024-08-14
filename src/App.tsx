import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import MainPage from './pages/MainPage/MainPage';
import DetailPage from './pages/DetailPage/DetailPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/pokemon/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
