import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import { ReactComponent as OverallScoreIcon } from "assets/icons/score.svg";
import { ReactComponent as GrammerMistakesIcon } from "assets/icons/grammer.svg";
import { ReactComponent as SpellingMistakesIcon } from "assets/icons/spelling.svg";
import { ReactComponent as HintsIcon } from "assets/icons/hints.svg";
import {
  OverallScoresSection,
  SpellingMistakesSection,
  GrammerMistakesSection,
  HintsAndSuggestionsSection,
} from "./components";
import LoadingSkeleton from "./components/LoadingSkeleton";
import "react-toastify/dist/ReactToastify.css";

export default function Sidebar({
  activeTab,
  setActiveTab,
  scores,
  spellingMistakesList,
  grammerMistakesList,
  suggestionsList,
}) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // The current width of the viewport
  // The width below which the mobile view should be rendered
  const breakpoint = 1420;

  useEffect(() => {
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth));
  }, []);

  const tabs = [
    {
      title: "Overall Scores",
      icon: <OverallScoreIcon />,
      loaded: !!scores,
      content: <OverallScoresSection scores={scores} />,
    },
    {
      title: "Spelling Mistakes",
      icon: <SpellingMistakesIcon style={{ marginBottom: "3px" }} />,
      loaded: !!spellingMistakesList,
      content: (
        <SpellingMistakesSection spellingMistakesList={spellingMistakesList} />
      ),
    },
    {
      title: "Grammer Mistakes",
      icon: <GrammerMistakesIcon />,
      loaded: !!grammerMistakesList,
      content: (
        <GrammerMistakesSection grammerMistakesList={grammerMistakesList} />
      ),
    },
    {
      title: "Hints & Suggestions",
      icon: <HintsIcon />,
      loaded: !!suggestionsList,
      content: <HintsAndSuggestionsSection suggestionsList={suggestionsList} />,
    },
  ];

  const tabComponents = tabs.map((tab, index) => (
    <li
      key={index}
      className={`${style.sideItem} ${
        activeTab === index &&
        (screenWidth < breakpoint ? style.mobileActive : style.desktopActive)
      } ${screenWidth < breakpoint ? style.mobile : style.desktop} mx-1`}
      onClick={() => setActiveTab(index)}
    >
      {tab.icon}
      <span className="w-11/12">{tab.title}</span>
    </li>
  ));

  return screenWidth < breakpoint ? (
    <div
      className={`min-h-screen px-10 pb-16 bg-white ${style.sidebarContainer} transition-transform `}
    >
      <div className="text-3xl font-bold mb-2">Your Feedback</div>
      <ul className="flex justify-center my-12">{tabComponents}</ul>
      <div className="ps-5">
        {tabs[activeTab].loaded ? tabs[activeTab].content : <LoadingSkeleton />}
      </div>
    </div>
  ) : (
    <div
      className={`fixed overflow-x-hidden z-0 top-0 right-0 h-full pt-12 w-4/12 bg-white ${style.sidebarContainer} `}
    >
      <div className="px-5 text-lg font-bold mb-2">Your Feedback</div>
      <div className="w-9/12 ps-5 h-[calc(100%-30px)]">
        {tabs[activeTab].loaded ? tabs[activeTab].content : <LoadingSkeleton />}
      </div>
      <ul className="space-y-2 absolute top-0 overflow-y-scoll -right-4 mt-12">
        {tabComponents}
      </ul>
    </div>
  );
}
