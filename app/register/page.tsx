"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import CosmicLoader from '@/components/Loader'
import apiRequest from '@/util/apiRequest'
import { useState } from 'react'

const Page = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')

    if (loading) {
        return <CosmicLoader />
    }

    const handleRegister = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            setLoading(false)
            return
        }

        try {
            const res = await apiRequest.post("/auth/register", {
                email,
                password,
            })
            
            if (res.status === 200) {
                setError("Successfully registered")
            } else {
                setError("Failed to register")
            }
        } catch (error) {
            console.error(error)
            setError("Failed to register")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Page
