import React, { useEffect } from 'react'
import { OverallScoreCard, DetailedScoreCard } from './Cards'

export default function OverallScoresSection({ scores }) {
    function formatNumberWithDecimalPlaces(number) {
        if (typeof number !== 'number' || isNaN(number)) {
            throw new Error('Input is not a valid number')
        }

        // Use toFixed to format the number with the desired decimal places
        const formattedNumber = number.toFixed(1)

        // Convert the formatted number back to a string
        return formattedNumber
    }

    function calculateAverageScores(scores) {
        let totalScore = 0
        let numScores = 0

        for (const category in scores) {
            if (
                scores.hasOwnProperty(category) &&
                typeof scores[category].score === 'number'
            ) {
                totalScore += scores[category].score
                numScores++
            }
        }

        if (numScores === 0) {
            return 0 // To handle cases where there are no valid scores.
        }

        const averageScore = totalScore / numScores
        return formatNumberWithDecimalPlaces(Math.round(averageScore * 2) / 2)
    }

    return (
        scores && (
            <div className="flex flex-col gap-3">
                <OverallScoreCard score={calculateAverageScores(scores)} />
                {scores && (
                    <>
                        <DetailedScoreCard
                            typeIndex={0}
                            score={formatNumberWithDecimalPlaces(
                                scores?.TaskAchievement?.score
                            )}
                            description={scores?.TaskAchievement?.description}
                        />
                        <DetailedScoreCard
                            typeIndex={1}
                            score={formatNumberWithDecimalPlaces(
                                scores?.CoherenceCohesion?.score
                            )}
                            description={scores?.CoherenceCohesion?.description}
                        />
                        <DetailedScoreCard
                            typeIndex={2}
                            score={formatNumberWithDecimalPlaces(
                                scores?.LexicalResource?.score
                            )}
                            description={scores?.LexicalResource?.description}
                        />
                        <DetailedScoreCard
                            typeIndex={3}
                            score={formatNumberWithDecimalPlaces(
                                scores?.GrammaticalRangeAccuracy?.score
                            )}
                            description={
                                scores?.GrammaticalRangeAccuracy?.description
                            }
                        />
                    </>
                )}
            </div>
        )
    )
}
