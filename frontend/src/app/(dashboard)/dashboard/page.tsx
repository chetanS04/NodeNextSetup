'use client'
import React from 'react'
import ProtectedRoute from '@/app/components/ProtectedRoute'
import DashboardLayout from '@/app/layouts/DashboardLayout'
import { ArrowUpRight } from 'lucide-react'

const page = () => {
  return (

    <>
      <ProtectedRoute role="ADMIN">
        <DashboardLayout>
          <div className='flex gap-5 justify-center items-center flex-wrap'>
            <div className="bg-white rounded-2xl shadow-md p-5 flex-[1_1_300px] transition hover:shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="text-gray-500 text-sm font-medium">Total Products</div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-gray-800">Value</div>

                <div className='flex items-center gap-1 text-sm'>
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Growth</span>
                </div>

              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-5 flex-[1_1_300px] transition hover:shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="text-gray-500 text-sm font-medium">Total Products</div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-gray-800">Value</div>

                <div className='flex items-center gap-1 text-sm'>
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Growth</span>
                </div>

              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-5 flex-[1_1_300px] transition hover:shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="text-gray-500 text-sm font-medium">Total Products</div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-gray-800">Value</div>

                <div className='flex items-center gap-1 text-sm'>
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Growth</span>
                </div>

              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-5 flex-[1_1_300px] transition hover:shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="text-gray-500 text-sm font-medium">Total Products</div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-gray-800">Value</div>

                <div className='flex items-center gap-1 text-sm'>
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Growth</span>
                </div>

              </div>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    </>

  )
}

export default page



