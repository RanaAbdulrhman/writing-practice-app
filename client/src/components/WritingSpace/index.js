import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { ReactComponent as Avatar } from "assets/icons/PersonAvatar.svg";

export default function Index({
  isEvaluate,
  disabled = false,
  spellingMistakesList,
  grammerMistakesList,
  activeTab,
  isTextareaActive,
  setIsTextareaActive,
  essay,
  setEssay,
  wordCount,
  setWordCount,
}) {
  let textChangeHandler = (e) => {
    setEssay(e.target.value);
  };

  // if all essay is deleted from the outside
  useEffect(() => countWords(essay), [essay]);

  function countWords(str) {
    let c = 0;
    let str1 = str.split(" ");

    for (let i = 0; i < str1.length; i++) {
      if (str1.length === 0) {
        setWordCount(0);
      }
      if (str1[i] !== "") {
        c++;
      }
      setWordCount(c);
    }
  }

  const WordMistakesHighlighter = ({ text, mistakes, mistakeType }) => {
    let result = [];
    let lastIndex = 0;

    for (const mistake of mistakes) {
      const { offset, length } = mistake;
      const beforeMistake = text.substring(lastIndex, offset);
      const mistakeText = text.substring(offset, offset + length);

      result.push(
        <span key={lastIndex}>{beforeMistake}</span>,
        <span
          key={offset}
          style={{
            color: mistakeType === "spelling" ? "red" : "#FFAE2C",
          }}
          className={
            mistakeType === "spelling"
              ? style.spellingHighlightedWord
              : style.grammerHighlightedWord
          }
        >
          {mistakeText}
        </span>
      );

      lastIndex = offset + length;
    }

    // Add the remaining text after the last mistake
    if (lastIndex < text.length) {
      result.push(<span key={lastIndex}>{text.substring(lastIndex)}</span>);
    }

    return <div className={style.essayHolder}>{result}</div>;
  };

  let color = "gray";

  if (!isEvaluate) {
    if (wordCount >= 250 && wordCount <= 300) {
      color = "green";
    } else if (
      (wordCount >= 200 && wordCount < 250) ||
      (wordCount > 300 && wordCount <= 350)
    ) {
      color = "orange";
    } else {
      color = "red";
    }
  } else {
    color = "gray";
  }

  return (
    <div className="flex flex-col gap-2 items-start content-start w-full">
      <div className={`${style.wordCounter} ms-12`}>
        <span className={style.currentNumberOfWords} style={{ color: color }}>
          {wordCount}
        </span>
        / 250 words
      </div>
      <div className="flex gap-2 items-start content-start w-full">
        <Avatar className="w-9" />
        <div className="w-full flex flex-col justify-around gap-3">
          {isEvaluate ? (
            <div
              className={`font-semibold text-sm rounded-lg start-0 p-4 ${style.textAreaContainer} ${style.uneditable}`}
            >
              {activeTab === 1
                ? spellingMistakesList && (
                    <WordMistakesHighlighter
                      text={essay}
                      mistakes={spellingMistakesList}
                      mistakeType="spelling"
                    />
                  )
                : activeTab === 2
                ? grammerMistakesList && (
                    <WordMistakesHighlighter
                      text={essay}
                      mistakes={grammerMistakesList}
                      mistakeType="grammar"
                    />
                  )
                : essay}
            </div>
          ) : (
            <>
              <textarea
                color="gray"
                placeholder="Start writing to begin the timer."
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                containerProps={{
                  className: "grid h-full",
                }}
                value={essay}
                spellcheck="false"
                onChange={textChangeHandler}
                disabled={disabled}
                data-gramm="false"
                ata-gramm_editor="false"
                data-enable-grammarly="false"
                className={`font-semibold text-md rounded-lg start-0 p-4 ${
                  style.textAreaContainer
                } ${!isTextareaActive && style.clickToActivate}`}
                onFocus={() => setIsTextareaActive(true)}
                onBlur={() => setIsTextareaActive(false)}
              ></textarea>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
