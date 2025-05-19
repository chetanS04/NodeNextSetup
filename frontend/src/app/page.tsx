import React from 'react';
import MarketingLayout from './layouts/MarketingLayout';
import { AuthProvider } from '@/context/AuthContext';

const Page = () => {
  return (
    <AuthProvider>
      <MarketingLayout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center animate-fade-in">
            <h1 className="text-3xl font-bold text-indigo-700 mb-4">
              👋 Hello, welcome to the frontend page!
            </h1>
            <p className="text-gray-600 text-lg">
              We're glad you're here. Enjoy exploring the beautiful frontend design.
            </p>
          </div>
        </div>
      </MarketingLayout>
    </AuthProvider>
  );
};

export default Page;
