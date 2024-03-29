import React from "react";
import CorrectionCard from "./Cards";
import style from "./style.module.scss";
import EmptyState from "components/EmptyState";

export default function GrammerMistakesSection({ grammerMistakesList }) {
  const CorrectionCardsList =
    grammerMistakesList &&
    grammerMistakesList.map((item, index) => {
      return (
        <CorrectionCard
          key={index}
          sentenceBefore={item?.bad}
          sentenceAfter={item?.better?.[0]}
        />
      );
    });

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-end gap-1">
        <div className={style.orangeDot}></div>
        <div className={style.alerts}>
          {grammerMistakesList && grammerMistakesList?.length} Alerts
        </div>
      </div>
      {grammerMistakesList?.length ? (
        <div className="flex flex-col gap-3 overflow-y-auto h-[calc(100%-15px)] mb-5 pe-3">
          {CorrectionCardsList}
        </div>
      ) : (
        <EmptyState
          title="Perfect Grammer!"
          desc="Flawless! Your essay is free from grammatical errors."
        />
      )}
    </div>
  );
}
