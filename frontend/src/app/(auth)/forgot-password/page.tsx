"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import axios from "axios"

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
});

interface ForgotPasswordFormInputs {
    email: string;
}

const ForgotPasswordPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ForgotPasswordFormInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: ForgotPasswordFormInputs) => {
        try {
            await axios.post('/auth/forgot-password', {
                email: data.email,
            });

            alert('Password reset link has been sent to your email.');
            reset();
        } catch (error: any) {
            alert(error.response?.data?.message || 'Failed to send reset link.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
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

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </button>

                <div className="text-center p-2">
                    Remembered your password?{' '}
                    <span className="text-blue-400">
                        <Link href="/login">Login</Link>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
