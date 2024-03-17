import React, { useEffect, useState } from "react";
import CorrectionCard from "./Cards";
import style from "./style.module.scss";
import axios from "axios";
import EmptyState from "components/EmptyState";
export default function SpellingMistakesSection({ spellingMistakesList }) {
  const CorrectionCardsList =
    spellingMistakesList &&
    spellingMistakesList.map((item, index) => (
      <CorrectionCard
        key={index}
        wordBefore={item?.bad}
        wordAfter={item?.better?.[0]}
      />
    ));

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-end gap-1">
        <div className={style.redDot}></div>
        <div className={style.alerts}>
          {spellingMistakesList && spellingMistakesList?.length} Alerts
        </div>
      </div>
      {spellingMistakesList?.length ? (
        <div className="flex flex-col gap-3 overflow-y-auto h-[calc(100%-15px)] mb-5 pe-3">
          {CorrectionCardsList}
        </div>
      ) : (
        <EmptyState
          title="Perfect Spelling!"
          desc="Well done! No spelling mistakes found in your essay."
        />
      )}
    </div>
  );
}
