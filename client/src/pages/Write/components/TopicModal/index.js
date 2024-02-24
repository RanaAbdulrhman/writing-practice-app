import React, { useState } from "react";
import styles from "./style.module.scss";

import { ReactComponent as TopicIcon } from "assets/icons/topicIcon.svg";
import { ReactComponent as CloseSign } from "assets/icons/closeSign.svg";
import { ReactComponent as CheckIcon } from "assets/icons/check.svg";

import { ReactComponent as EducationIcon } from "assets/icons/Education.svg";
import { ReactComponent as TechnologyIcon } from "assets/icons/Technology.svg";
import { ReactComponent as HealthIcon } from "assets/icons/Health.svg";
import { ReactComponent as EnvironmentIcon } from "assets/icons/Environment.svg";
import { ReactComponent as SocietyIcon } from "assets/icons/Society.svg";
import { ReactComponent as GovernmentIcon } from "assets/icons/Government.svg";
import { ReactComponent as WorkIcon } from "assets/icons/Work.svg";
import { ReactComponent as CrimeIcon } from "assets/icons/Crime.svg";
import { ReactComponent as MediaIcon } from "assets/icons/Media.svg";

const TopicModal = ({
  generateTopic,
  openTopicModal,
  setOpenTopicModal,
  resetTimer,
}) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

  const categories = [
    { name: "Education", icon: <EducationIcon /> },
    { name: "Technology", icon: <TechnologyIcon /> },
    { name: "Health", icon: <HealthIcon /> },
    { name: "Environment", icon: <EnvironmentIcon /> },
    { name: "Society and Culture", icon: <SocietyIcon /> },
    { name: "Government and Politics", icon: <GovernmentIcon /> },
    { name: "Work and Employment", icon: <WorkIcon /> },
    { name: "Crime and Punishment", icon: <CrimeIcon /> },
    { name: "Arts and Media", icon: <MediaIcon /> },
  ];

  function selectCategory(index) {
    setSelectedCategoryIndex(index);
    resetTimer();
  }

  const categoryComponents = categories.map((item, index) => {
    return (
      <div
        className={`${styles.categoryBox} ${
          selectedCategoryIndex === index && styles.selected
        }`}
        onClick={() => selectCategory(index)}
        key={index}
      >
        <div className="flex gap-4">
          <div className={styles.iconContainer}>{item.icon}</div>
          <span className={styles.categoryName}>{item.name}</span>
        </div>
        <div
          className={`${styles.checkRound} ${
            selectedCategoryIndex === index && styles.selected
          }`}
        >
          <CheckIcon />
        </div>
      </div>
    );
  });

  return (
    openTopicModal && (
      <>
        <div
          className={styles.darkBG}
          //   onClick={() => setOpenTopicModal(false)}
        />
        <div className={styles.centered}>
          <div
            className={`${styles.modal} transition-all ease-in-out delay-150`}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>
                <TopicIcon />
              </div>

              {/* <button
                className={` text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white ${styles.closeBtn}`}
                onClick={() => setOpenTopicModal(false)}
              >
                <CloseSign />
              </button> */}
            </div>
            <div className={styles.modalContent}>
              <h5 className={styles.heading}>Choose a Topic Category</h5>
              <p className={styles.modalDesc}>
                Select the topic category that interests you the most, and we'll
                generate a relevant writing topic for you.
              </p>
            </div>
            <div className={styles.categoriesSection}>{categoryComponents}</div>
            <button
              onClick={() => {
                let category = categories[selectedCategoryIndex].name;
                sessionStorage.setItem("category", category);
                generateTopic(category);
              }}
              className={styles.actionButton}
            >
              Generate a Topic
            </button>
          </div>
        </div>
      </>
    )
  );
};

export default TopicModal;
