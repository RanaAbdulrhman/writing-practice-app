import React from 'react'
import { ReactComponent as Logo } from 'assets/logos/ImmersiveWritingLogo.svg'
import { Link } from 'react-router-dom'
export default function Navbar() {
    return (
        <Link to="/">
            <div className="flex align-center gap-2 p-5 border-b">
                <Logo />
                <div className="flex align-center font-bold text-lg text-center py-2">
                    <span>Immersive Writing</span>
                </div>
            </div>
        </Link>
    )
}
