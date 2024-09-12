import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/login';
import MainPage from './pages/MainPage/MainPage';
import DetailPage from './pages/DetailPage/DetailPage';
import NavBar from './components/NavBar';
import NewPost from './pages/NewPost';

const Layout = () => {
  return (
    <>
      <NavBar />
      <br />
      <br />
      <br />
      <Outlet />
    </>
  );
};
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/newPost" element={<NewPost />} />
          <Route index element={<MainPage />} />
          <Route path="/pokemon/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
