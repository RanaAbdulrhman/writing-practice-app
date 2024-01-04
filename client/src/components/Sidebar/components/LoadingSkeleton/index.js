import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function LoadingSkeleton() {
    return (
        <div className="flex flex-col gap-6">
            <Skeleton height={80} borderRadius={10} />
            <Skeleton height={80} borderRadius={10} />
            <Skeleton height={80} borderRadius={10} />
            <Skeleton height={80} borderRadius={10} />
            <Skeleton height={80} borderRadius={10} />
        </div>
    )
}
