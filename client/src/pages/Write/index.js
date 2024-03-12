import React, { useState, useEffect } from "react";
import TopicBar from "components/TopicBar";
import WritingSpace from "components/WritingSpace";
import Sidebar from "components/Sidebar";
import LoadingButton from "components/LoadingButton";
import { ReactComponent as BackButton } from "assets/icons/back-button.svg";

import axios from "axios";
import Timer from "./components/Timer";
import RestartSession from "./components/RestartSession";
import TopicModal from "pages/Write/components/TopicModal";
import "react-loading-skeleton/dist/skeleton.css";
import ReactAppzi from "react-appzi";
import { useStopwatch } from "react-timer-hook";
import ConfirmationModal from "./components/ConfirmationModal";
import { ActionTypes } from "utils/constants";
import style from "./style.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Index() {
  ReactAppzi.initialize(process.env.REACT_APP_APPZI_TOKIN);

  const [topic, setTopic] = useState(sessionStorage.getItem("topic"));
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isEvaluate, setIsEvaluate] = useState(
    stringToBoolean(sessionStorage.getItem("isEvaluate"))
  );
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(
    !sessionStorage.getItem("category") || !sessionStorage.getItem("topic")
  );
  const [isTopicLoading, setIsTopicLoading] = useState(false);
  const [isEvaluationLoading, setIsEvaluationLoading] = useState(false);

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [spellingMistakesList, setSpellingMistakesList] = useState(
    JSON.parse(sessionStorage.getItem("spellingMistakesList")) || null
  );
  const [grammerMistakesList, setGrammerMistakesList] = useState(
    JSON.parse(sessionStorage.getItem("grammerMistakesList")) || null
  );
  const [suggestionsList, setSuggestionsList] = useState(
    JSON.parse(sessionStorage.getItem("suggestionsList")) || null
  );
  const [scores, setScores] = useState(
    JSON.parse(sessionStorage.getItem("scores")) || null
  );
  const [essay, setEssay] = useState(sessionStorage.getItem("essay") || "");
  const [currentAction, setCurrentAction] = useState(null);
  const [isTextareaActive, setIsTextareaActive] = useState(false);
  const [viewRestartOptions, setViewRestartOptions] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });
  console.log(
    "with !!, in sessionStorage",
    typeof !!sessionStorage.getItem("isEvaluate"),
    !!sessionStorage.getItem("isEvaluate")
  );
  console.log("no !!, in state", isEvaluate);

  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("essay", essay);
    sessionStorage.setItem("isEvaluate", isEvaluate);
    sessionStorage.setItem(
      "grammerMistakesList",
      JSON.stringify(grammerMistakesList)
    );
    sessionStorage.setItem(
      "spellingMistakesList",
      JSON.stringify(spellingMistakesList)
    );
    sessionStorage.setItem("suggestionsList", JSON.stringify(suggestionsList));
    sessionStorage.setItem("scores", JSON.stringify(scores));
  });

  window.onclick = function (e) {
    // if the restart options modal is open and the user clicked anywhere else on the screen, close the modal
    if (
      viewRestartOptions &&
      !(
        e.target
          .closest(".restart-options")
          ?.className?.includes("restart-options") ||
        e.target.className?.includes("restart-options")
      )
    ) {
      setViewRestartOptions(false);
    }
  };

  // The width below which the mobile view should be rendered
  const breakpoint = 1420;

  useEffect(() => {
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth));
  }, []);

  function stringToBoolean(string) {
    if (String(string).toLowerCase() === "true") {
      return true;
    } else return false;
  }
  function isValidJSON(object, key, errorMessage) {
    try {
      const test = object[key];
    } catch (e) {
      console.log(`unable to parse: ${e}`);
      toast.error(errorMessage, {});
    }
  }

  async function loadScores() {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE}/api/submit-essay`,
        {
          topic: topic,
          essay: essay,
          numberOfWords: wordCount,
        }
      );
      const data = await res.data;
      isValidJSON(
        "data",
        "TaskAchievement",
        "Oops! Something went wrong while evaluating your essay. Please refresh the page and try again."
      );
      return data;
    } catch (err) {
      toast.error(
        "Something went wrong. Please refresh the page and try again.",
        {}
      );
      console.log(err);
    }
  }

  async function loadSuggestions() {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE}/api/generate-suggestions`,
        { topic: topic, essay: essay }
      );
      const data = await res.data;
      isValidJSON(
        data,
        "suggestions",
        "Oops! Something went wrong while crafting suggestions for you. Please refresh the page and try again."
      );
      return data;
    } catch (err) {
      toast.error(
        "Something went wrong. Please refresh the page and try again.",
        {}
      );
      console.log(err);
    }
  }

  async function extractSpellingMistakes() {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE}/api/extract-spelling-mistakes`,
        {
          essay: essay,
        }
      );
      const data = await res.data;
      return data;
    } catch (err) {
      toast.error(
        "Something went wrong. Please refresh the page and try again.",
        {}
      );
      console.log(err);
    }
  }

  async function extractGrammerMistakes() {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE}/api/extract-grammar-mistakes`,
        {
          essay: essay,
        }
      );
      const data = await res.data;
      return data;
    } catch (err) {
      toast.error(
        "Something went wrong. Please refresh the page and try again.",
        {}
      );
      console.log(err);
    }
  }

  async function generateTopic(category) {
    setIsTopicLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE}/api/generate-topic`,
        {
          category: category,
        }
      );
      const data = await res.data;
      setTopic(data);
      sessionStorage.setItem("topic", data);
      setIsTopicLoading(false);
      setIsTopicModalOpen(false);
      return data;
    } catch (err) {
      toast.error(
        "Something went wrong. Please refresh the page and try again.",
        {}
      );
      console.log(err.message);
    }

    setIsTopicLoading(false);
  }

  const handleEvaluateBtnClick = () => {
    if (essay) {
      setIsEvaluationLoading(true);

      loadScores()
        .then((data) => {
          setScores(data);
          setIsEvaluationLoading(false);
          setIsEvaluate(true);
        })
        .catch((err) => {
          toast.error(
            "Something went wrong. Please refresh the page and try again.",
            {}
          );
          console.log(err.message);
        });
      extractSpellingMistakes()
        .then((data) => {
          const spellingMistakes = data.filter(
            (item) => item.type === "spelling"
          );
          setSpellingMistakesList(spellingMistakes);
        })
        .catch((err) => {
          toast.error(
            "Something went wrong. Please refresh the page and try again.",
            {}
          );
          console.log(err.message);
        });
      extractGrammerMistakes()
        .then((data) => {
          const grammerMistakes = data.filter(
            (item) => item.type === "grammar"
          );
          setGrammerMistakesList(grammerMistakes);
        })
        .catch((err) => {
          toast.error(
            "Something went wrong. Please refresh the page and try again.",
            {}
          );
          console.log(err.message);
        });

      loadSuggestions()
        .then((data) => {
          setSuggestionsList(data?.suggestions);
        })
        .catch((err) => {
          toast.error(
            "Something went wrong. Please refresh the page and try again.",
            {}
          );
          console.log(err);
        });
    }
  };

  function resetTimer() {
    reset(new Date(), false);
  }

  function generateNewTopic() {
    setTopic(null);
    generateTopic(sessionStorage.getItem("category"));
    resetTimer();
  }

  function changeCategory() {
    setTopic(null);
    sessionStorage.removeItem("category");
    sessionStorage.removeItem("topic");
    setIsTopicModalOpen(true);
    resetTimer();
  }

  const openConfirmationModal = (actionType) => {
    setCurrentAction(actionType);
    setViewRestartOptions(false);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const performRestartAction = (currentAction) => {
    console.log("currentAction", currentAction);
    setViewRestartOptions(false);
    switch (currentAction) {
      case ActionTypes.RESTART_TIMER:
        resetTimer();
        break;
      case ActionTypes.SWITCH_TOPIC:
        generateNewTopic();
        break;
      case ActionTypes.CHANGE_CATEGORY:
        changeCategory();
        break;
      default:
        break;
    }
    setEssay("");
    setIsConfirmationModalOpen(false);
  };
  function performActionWithoutConfirmation(actionType) {
    setCurrentAction(actionType);
    performRestartAction(actionType);
  }

  return (
    <div
      className={`flex flex-col items-center justify-center w-full flex-grow-1`}
    >
      <div
        className={`flex justify-between ${
          screenWidth < breakpoint ? "flex-col-reverse" : ""
        } ${!isEvaluate && "py-8"} w-full`}
      >
        <div
          className={`flex flex-col items-center px-10 ${
            isEvaluate && screenWidth > breakpoint
              ? "relative w-full top-14 gap-4 xl:w-8/12 sm:w-full"
              : "w-full gap-4"
          } ${isEvaluate && screenWidth < breakpoint && "py-12"}`}
        >
          <div className="flex w-full justify-between mb-2">
            {isEvaluate && screenWidth > breakpoint ? (
              <button
                className={`flex h-100 gap-2 justify-between items-center px-4 ${style.backButton}`}
                onClick={() => {
                  setScores(null);
                  setSuggestionsList(null);
                  setGrammerMistakesList(null);
                  setSpellingMistakesList(null);
                  setActiveTab(0);
                  setIsEvaluate(false);
                }}
              >
                <BackButton />
                Back
              </button>
            ) : (
              <div></div>
            )}
            <div className="flex">
              <Timer
                seconds={seconds}
                minutes={minutes}
                hours={hours}
                start={start}
                pause={pause}
                isActive={isTextareaActive}
              />
              {!isEvaluate && (
                <RestartSession
                  viewRestartOptions={viewRestartOptions}
                  setViewRestartOptions={setViewRestartOptions}
                  onOptionClick={
                    essay
                      ? openConfirmationModal
                      : performActionWithoutConfirmation
                  }
                />
              )}
            </div>
          </div>

          <TopicBar topic={topic} isLoading={isTopicLoading} />
          <WritingSpace
            disabled={isEvaluate}
            isEvaluate={isEvaluate}
            spellingMistakesList={spellingMistakesList}
            grammerMistakesList={grammerMistakesList}
            activeTab={activeTab}
            isTextareaActive={isTextareaActive}
            setIsTextareaActive={setIsTextareaActive}
            essay={essay}
            setEssay={setEssay}
            wordCount={wordCount}
            setWordCount={setWordCount}
          />
          <div className="flex gap-2 justify-between w-full">
            <div className="w-9"></div>
            <div className="flex items-center justify-end w-full">
              {!isEvaluate && (
                <LoadingButton
                  onBtnClick={() => {
                    handleEvaluateBtnClick();
                    setIsEvaluate(true);
                  }}
                  isLoading={isEvaluationLoading}
                  className={`${style.button}`}
                  title="Evaluate My Writing"
                />
              )}
            </div>
          </div>
        </div>

        {isEvaluate && (
          <div
            className={`flex flex-col ${
              screenWidth > breakpoint ? "xl:w-1/4" : "w-full"
            } `}
          >
            {screenWidth <= breakpoint && (
              <div className="flex justify-start m-5">
                <button
                  className={`flex py-2 gap-2 justify-between items-center px-4 ${style.backButton} ${style.mobile}`}
                  onClick={() => {
                    setScores(null);
                    setSuggestionsList(false);
                    setGrammerMistakesList(false);
                    setSpellingMistakesList(false);
                    setActiveTab(0);
                    setIsEvaluate(false);
                  }}
                >
                  <BackButton />
                  Back
                </button>
              </div>
            )}
            <Sidebar
              scores={scores}
              spellingMistakesList={spellingMistakesList}
              grammerMistakesList={grammerMistakesList}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              suggestionsList={suggestionsList}
            />
          </div>
        )}
      </div>
      {isTopicModalOpen && (
        <TopicModal
          generateTopic={generateTopic}
          openTopicModal={isTopicModalOpen}
          setOpenTopicModal={setIsTopicModalOpen}
          resetTimer={resetTimer}
          isTopicLoading={isTopicLoading}
        />
      )}
      {isConfirmationModalOpen && (
        <ConfirmationModal
          onConfirmation={performRestartAction}
          closeModal={closeConfirmationModal}
        />
      )}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
