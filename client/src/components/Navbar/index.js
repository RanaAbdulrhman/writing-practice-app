import React from 'react'
import { ReactComponent as Logo } from 'assets/logos/logo.svg'

export default function Navbar() {
    return (
        <div className="flex gap-2 p-5 border-b">
            <Logo className="w-10" />
            <div className="font-extrabold text-xl">Practice Writing</div>
        </div>
    )
}
