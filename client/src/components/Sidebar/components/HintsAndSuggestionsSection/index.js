import React from 'react'
import HintCard from './Cards'
import style from './style.module.scss'
export default function HintsAndSuggestionsSection({ suggestionsList }) {
    const suggestionsCardsList =
        suggestionsList &&
        suggestionsList.map((item, index) => (
            <HintCard key={index} description={item} />
        ))

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-end gap-1">
                <div className={style.orangeDot}></div>
                <div className={style.alerts}>
                    {suggestionsList && suggestionsList?.length} Hints
                </div>
            </div>

            {suggestionsCardsList}
        </div>
    )
}
