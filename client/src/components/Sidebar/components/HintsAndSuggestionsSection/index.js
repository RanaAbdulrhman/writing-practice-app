import React from "react";
import HintCard from "./Cards";
import style from "./style.module.scss";
import EmptyState from "components/EmptyState";
import { ReactComponent as EmptyImprovements } from "assets/icons/emptyImprovements.svg";
import "react-toastify/dist/ReactToastify.css";

export default function HintsAndSuggestionsSection({ suggestionsList }) {
  const suggestionsCardsList =
    suggestionsList &&
    suggestionsList.map((item, index) => (
      <HintCard key={index} description={item} />
    ));

  return (
    <>
      <div className="flex flex-col gap-3 h-full">
        <div className="flex items-center justify-end gap-1">
          <div className={style.orangeDot}></div>
          <div className={style.alerts}>
            {suggestionsList && suggestionsList?.length} Hints
          </div>
        </div>
        <div className="flex flex-col gap-3 overflow-y-auto h-full mb-5 pe-3">
          {suggestionsList?.length ? (
            suggestionsCardsList
          ) : (
            <EmptyState
              icon={<EmptyImprovements />}
              title="No suggested improvements!"
              desc="Great job! Your essay is already at its best."
            />
          )}
        </div>
      </div>
    </>
  );
}
