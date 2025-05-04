"use client"
import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button"


export default function Login() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const { login } = useAuth();

  useEffect(() => {
    document.title = "Login"; 
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post('/users/login', { username, password });
    login(res.data.data.accessToken);
    
  };

  return (
  <>
   
    <div className="min-h-screen flex items-center justify-center">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2">Login</button>
        <Button>Click me</Button>
      </form>
    </div>
    </>
  );
}
