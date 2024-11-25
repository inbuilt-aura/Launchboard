'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '../../../context/AuthContext'

export default function AuthSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      const user = {
        token: token,
        id: '',
        name: '',
        email: ''
      }
      login(user)
      router.push('/dashboard')
    } else {
      router.push('/auth')
    }
  }, [router, searchParams, login])

  return <div>Authenticating...</div>
}

