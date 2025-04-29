import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = () => <h1>Bienvenido a Store Home</h1>;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
