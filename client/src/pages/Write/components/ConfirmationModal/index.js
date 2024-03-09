import React from "react";
import style from "./style.module.scss";
import { ReactComponent as AlertIcon } from "assets/icons/alertIcon.svg";
import { ReactComponent as CloseSign } from "assets/icons/closeSign.svg";

export default function ConfirmationModal({ onConfirmation, closeModal }) {
  return (
    <div
      id="popup-modal"
      className={` ${style.darkBG} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[100%] max-h-full`}
    >
      <div
        className={`relative p-4 w-full max-w-md max-h-full ${style.centered}`}
      >
        <div className="relative bg-white rounded-lg shadow ">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={closeModal}
          >
            <CloseSign />
          </button>
          <div className="p-4 md:p-5 text-center flex flex-col items-center gap-3">
            <AlertIcon />
            <h3 className={style.modalHeading}>
              Deleting your current progress
            </h3>
            <div className={style.modalDesc}>
              Resetting the timer will delete your current progress on writing
              the essay.
            </div>
            <div className="flex gap-3 w-full mt-3 px-4">
              <button
                className={`${style.btn} ${style.yesBtn}`}
                onClick={onConfirmation}
              >
                Proceed Anyway
              </button>
              <button
                className={`${style.btn} ${style.noBtn}`}
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
