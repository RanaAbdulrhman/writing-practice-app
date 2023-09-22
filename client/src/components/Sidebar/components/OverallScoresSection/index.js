import React from 'react'
import { OverallScoreCard, DetailedScoreCard } from './Cards'

export default function OverallScoresSection() {
    return (
        <div className="flex flex-col gap-3">
            <OverallScoreCard />

            <DetailedScoreCard
                typeIndex={0}
                score={'6.5'}
                description="Everything has tow sides in the world, and so has the prosses of globalization too. The effects of globalization on the world economy are diverted."
            />
            <DetailedScoreCard
                typeIndex={1}
                score="7.5"
                description="Everything has tow sides in the world, and so has the prosses of globalization too. The effects of globalization on the world economy are diverted."
            />
            <DetailedScoreCard
                typeIndex={2}
                score={'5.5'}
                description="Everything has tow sides in the world, and so has the prosses of globalization too. The effects of globalization on the world economy are diverted."
            />
            <DetailedScoreCard
                typeIndex={3}
                score={'6.5'}
                description="Everything has tow sides in the world, and so has the prosses of globalization too. The effects of globalization on the world economy are diverted."
            />
        </div>
    )
}
