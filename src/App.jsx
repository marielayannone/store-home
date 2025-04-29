
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (!error) setProducts(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Store Home</h1>
      <div className="flex flex-wrap gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded-lg w-60 shadow">
            <h2 className="font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="font-semibold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (!error) navigate('/login');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-2">Registro</h1>
      <input className="border p-2 w-full mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 w-full mb-2" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={register}>Registrar</button>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) navigate('/products');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-2">Login</h1>
      <input className="border p-2 w-full mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 w-full mb-2" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-green-500 text-white p-2 rounded" onClick={login}>Iniciar sesión</button>
    </div>
  );
}

function Publish() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const publish = async () => {
    const { error } = await supabase.from('products').insert([{ name, price, description }]);
    if (!error) navigate('/');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-2">Publicar producto</h1>
      <input className="border p-2 w-full mb-2" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
      <input className="border p-2 w-full mb-2" placeholder="Precio" value={price} onChange={e => setPrice(e.target.value)} />
      <textarea className="border p-2 w-full mb-2" placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} />
      <button className="bg-purple-500 text-white p-2 rounded" onClick={publish}>Publicar</button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 flex gap-4 bg-gray-100 mb-4">
        <Link to="/">Inicio</Link>
        <Link to="/register">Registro</Link>
        <Link to="/login">Login</Link>
        <Link to="/products">Publicar</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Publish />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
