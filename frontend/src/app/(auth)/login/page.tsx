"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import {jwtDecode} from 'jwt-decode'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // 👈 import useAuth


const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Minimum 8 characters').required('Password is required'),
});

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { login } = useAuth(); // 👈 get login from context

  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(schema) });

  const router = useRouter();



type DecodedToken = {
  id: string
  email: string
  role: string
  name: string
  exp: number
}


const handleLogin = async (data: LoginFormInputs) => {
  setError(null)
  try {
    const response = await fetch('http://localhost:3080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()

    if (response.ok) {
      const token = responseData.token

      if (token) {
        // ✅ Decode securely in-memory
        const decoded: DecodedToken = jwtDecode(token)

        // Only store token (NOT user or role) in localStorage
        localStorage.setItem('token', token)

        // ✅ Use context to store role in-memory only
        login(token) // role is extracted from token inside context

        // Redirect to dashboard
        router.push('/dashboard')
      }
    } else {
      setError(responseData.message || 'Invalid credentials')
    }
  } catch (err) {
    console.error('Login error:', err)
    setError('Something went wrong. Please try again.')
  }
}

  // const handleLogin = async (data: LoginFormInputs) => {
  //   setError(null);
  //   try {
  //     const response = await fetch('http://localhost:3080/auth/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data),
  //     });

  //     const responseData = await response.json();

  //     if (response.ok) {
  //       if (responseData.token) {
  //         localStorage.setItem('token', responseData.token);
  //         localStorage.setItem('user', JSON.stringify(responseData.user));
  //       }

  //       // Redirect to dashboard
  //       router.push('/dashboard');
  //     } else {
  //       setError(responseData.message || 'Invalid credentials');
  //     }
  //   } catch (err) {
  //     console.error('Login error:', err);
  //     setError('Something went wrong. Please try again.');
  //   }
  // };


  
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <form onSubmit={handleSubmit(handleLogin)}>
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-center p-2">
          Create an account{' '}
          <Link href="/register" className="text-blue-400">register</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
