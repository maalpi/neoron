'use client'

import { signOut } from "next-auth/react"

export default function Logout() {
    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: 'https://neoron-aeroporto.netlify.app/' });
    };

    return (
        <button 
            className="btn btn-outline text-slate-50 hover:text-blue-300" 
            onClick={handleLogout}
        >
            Sair
        </button>
    )
}