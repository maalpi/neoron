'use client'

import { signOut } from "next-auth/react"

export default function Logout(){
    return (
        <button className="btn btn-outline text-slate-50 hover:text-blue-300" onClick={() => signOut()}>
            sair
        </button>
    )
}