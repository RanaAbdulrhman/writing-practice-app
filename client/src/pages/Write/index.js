import React, { useState, useEffect } from "react";
import TopicBar from "components/TopicBar";
import WritingSpace from "components/WritingSpace";
import Sidebar from "components/Sidebar";
import LoadingButton from "components/LoadingButton";

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
  const [isEvaluate, setIsEvaluate] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(
    !sessionStorage.getItem("category") || !sessionStorage.getItem("topic")
  );
  const [isTopicLoading, setIsTopicLoading] = useState(false);
  const [isEvaluationLoading, setIsEvaluationLoading] = useState(false);

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [spellingMistakesList, setSpellingMistakesList] = useState(null);
  const [grammerMistakesList, setGrammerMistakesList] = useState(null);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [scores, setScores] = useState();
  const [essay, setEssay] = useState(sessionStorage.getItem("essay") || "");
  const [currentAction, setCurrentAction] = useState(null);
  const [isTextareaActive, setIsTextareaActive] = useState(false);
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("essay", essay);
  });

  // The width below which the mobile view should be rendered
  const breakpoint = 1420;

  useEffect(() => {
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth));
  }, []);

  function isValidJSON(object, errorMessage) {
    try {
      const obj = JSON.parse(object);
      console.log(obj); // This should work without throwing an error
    } catch (e) {
      console.log(`unable to parse: ${e}`);
      toast.error(errorMessage, {});
    }
  }

  async function loadScores() {
    // setLoading(true)
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE}/api/submit-essay`,
        {
          topic: topic,
          essay: essay,
        }
      );
      const data = await res.data;
      // isValidJSON(
      //   data,
      //   "Oops! Something went wrong while evaluating your essay. Please refresh the page and try again."
      // );
      return data;
    } catch (err) {
      toast.error(
        "Something went wrong. Please refresh the page and try again.",
        {}
      );
      console.log(err);
    }
    // setLoading(false)
  }

  async function loadSuggestions() {
    // setLoading(true)
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE}/api/generate-suggestions`,
        { topic: topic, essay: essay }
      );
      const data = await res.data;
      // isValidJSON(
      //   data,
      //   "Oops! Something went wrong while crafting suggestions for you. Please refresh the page and try again."
      // );
      return data;
    } catch (err) {
      toast.error(
        "Something went wrong. Please refresh the page and try again.",
        {}
      );
      console.log(err);
    }
    // setLoading(false)
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
          console.log("gammar mistakes", grammerMistakes);
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
    generateTopic(sessionStorage.getItem("category"));
    resetTimer();
  }

  function changeCategory() {
    setIsTopicModalOpen(true);
  }

  const openConfirmationModal = (actionType) => {
    setCurrentAction(actionType);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const performRestartAction = () => {
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
    performRestartAction();
  }

  return (
    <div
      className={`flex flex-col items-center justify-center w-full flex-grow-1`}
    >
      <div
        className={`flex justify-between ${
          screenWidth < breakpoint ? "flex-col-reverse" : ""
        } w-full`}
      >
        <div
          className={`flex flex-col items-center p-10 ${
            isEvaluate && screenWidth > breakpoint
              ? "relative w-full top-14 gap-5 px-8 xl:w-8/12 sm:w-full"
              : "w-full gap-5"
          }`}
        >
          <div className="flex w-full justify-end mb-2">
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
                onOptionClick={
                  essay
                    ? openConfirmationModal
                    : performActionWithoutConfirmation
                }
              />
            )}
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
          />
          <div className="flex gap-2 justify-between w-full">
            <div className="w-9"></div>
            <div className="flex items-center justify-end w-full mt-4">
              {isEvaluate || (
                <LoadingButton
                  onBtnClick={() => {
                    handleEvaluateBtnClick();
                    setIsEvaluate(true);
                  }}
                  isLoading={isEvaluationLoading}
                  className={`${style.button}`}
                  title="Evaluate My Writing"
                />
                // <button
                //   className={`flex gap-2 items-center w-full sm:w-full xl:w-[223px] ${style.button}`}
                //   onClick={() => {
                //     handleEvaluateBtnClick();
                //     setIsEvaluate(true);
                //   }}
                // >
                //   {isEvaluationLoading ? (
                //     <svg
                //       aria-hidden="true"
                //       class="w-6 h-6 text-gray-200 animate-spin fill-blue-600"
                //       viewBox="0 0 100 101"
                //       fill="none"
                //       xmlns="http://www.w3.org/2000/svg"
                //     >
                //       <path
                //         d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                //         fill="currentColor"
                //       />
                //       <path
                //         d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                //         fill="currentFill"
                //       />
                //     </svg>
                //   ) : (
                //     "Evaluate My Writing"
                //   )}
                // </button>
              )}
            </div>
          </div>
        </div>

        {isEvaluate && (
          <div
            className={`${screenWidth > breakpoint ? "xl:w-1/4" : "w-full"} `}
          >
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
