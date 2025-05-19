'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

interface ProtectedRouteProps {
    children: React.ReactNode
    role?: string
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.replace('/login')
            } else if (role && user.role !== role) {
                router.replace('/new')
            }
        }
    }, [user, loading, role, router])

    if (loading || !user || (role && user.role !== role)) {
        return <div className="text-center p-4">

            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin">...</div>
            </div>
        </div>
    }

    return <>{children}</>
}

export default ProtectedRoute
