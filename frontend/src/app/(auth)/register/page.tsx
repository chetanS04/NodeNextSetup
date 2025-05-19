"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import ErrorMessage from '@/app/components/ErrorMessage';
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ""], 'Passwords must match')
    .required('Confirm Password is required'),
});

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
      const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/auth/register`, // API base URL from env
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      );

      // If API returns token and user
      const { token, user } = response.data;
      // Optionally store token in localStorage or context

      window.location.href = '/'; // redirect to home/dashboard
    } catch (error: any) {
// setErrorMessage(error.response?.data?.message || 'Registration failed');
    setErrorMessage(error.response?.data?.error || 'Registration failed');

    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg">
                  {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)} />}

      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {['name', 'email', 'password', 'confirmPassword'].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-sm font-medium mb-1 capitalize">
              {field === 'confirmPassword' ? 'Confirm Password' : field}
            </label>
            <input
              type={field.toLowerCase().includes('password') ? 'password' : 'text'}
              {...register(field as keyof RegisterFormInputs)}
              className="w-full p-2 border rounded"
            />
            {errors[field as keyof RegisterFormInputs] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field as keyof RegisterFormInputs]?.message}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
        <div className="text-center p-2">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
