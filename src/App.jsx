import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Components/Layout';
import Home from './Components/Home';
import Create from './Components/Create';
import Edit from './Components/Edit';
import Details from './Components/Details';
import Cart from './Components/Cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="details/:id" element={<Details />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
