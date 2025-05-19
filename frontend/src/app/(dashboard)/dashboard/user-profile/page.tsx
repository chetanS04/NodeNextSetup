import React from 'react'
import ProtectedRoute from '@/app/components/ProtectedRoute';
import DashboardLayout from '@/app/layouts/DashboardLayout';


const getUserInfo = async () => {
    try {

    }
    catch (error) {
        console.log(error)
    }
}

const page = () => {
    return (
        <ProtectedRoute role='ADMIN'>
            <DashboardLayout>
                <>
                    Hello Welcome to the user profile
                </>
            </DashboardLayout>
        </ProtectedRoute>


    )
}

export default page;
