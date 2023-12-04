import React from 'react'
import { ReactComponent as Logo } from 'assets/logos/ImmersiveWritingLogo.svg'

export default function Navbar() {
    return (
        <div className="flex align-center gap-2 p-5 border-b">
            <Logo />
            <div className="flex align-center font-bold text-lg text-center py-2">
                <span>Immersive Writing</span>
            </div>
        </div>
    )
}
