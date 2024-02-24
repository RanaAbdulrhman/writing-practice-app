import React, { useState } from "react";
import style from "./style.module.scss";
import { ReactComponent as RestartIcon } from "assets/icons/restart.svg";
import { ReactComponent as RestartTimer } from "assets/icons/restartTimer.svg";
import { ReactComponent as SwitchTopic } from "assets/icons/switchTopic.svg";
import { ReactComponent as ChangeCategory } from "assets/icons/changeCategory.svg";
import { ActionTypes } from "utils/constants";
export default function RestartSession({ onOptionClick }) {
  const [viewRestartOptions, setViewRestartOptions] = useState(false);

  const OptionsList = () => (
    <div
      className={`absolute top-[40px] right-0 flex flex-col gap-2 items-center w-[250px] ${style.listBackground}`}
      onMouseLeave={() => setViewRestartOptions(false)}
    >
      <div className="flex flex-col gap-3">
        <Item
          icon={<RestartTimer />}
          title={"Restart Timer"}
          desc={"Begin a fresh writing session."}
          onOptionClick={() => onOptionClick(ActionTypes.RESTART_TIMER)}
        />
        <Item
          icon={<SwitchTopic />}
          title={"Switch Topic"}
          desc={`Generate a new topic within the same ${sessionStorage.getItem(
            "category"
          )} category.`}
          onOptionClick={() => onOptionClick(ActionTypes.SWITCH_TOPIC)}
        />
        <Item
          icon={<ChangeCategory />}
          title={"Change Category"}
          desc={"Change the topic category."}
          onOptionClick={() => onOptionClick(ActionTypes.CHANGE_CATEGORY)}
        />
      </div>
    </div>
  );

  return (
    <div className="relative">
      <button
        className={`relative h-full flex gap-2 items-center w-[100px] ms-3 ${
          style.button
        } ${viewRestartOptions && style.active}`}
        onClick={() => setViewRestartOptions(!viewRestartOptions)}
      >
        <div>
          <RestartIcon />
        </div>
        <div
          className={`${viewRestartOptions ? "font-bold" : "font-semibold"}`}
        >
          Restart
        </div>
      </button>
      {viewRestartOptions && <OptionsList />}
    </div>
  );
}

const Item = ({ icon, title, desc, onOptionClick }) => {
  return (
    <div className={`flex gap-2 ${style.item}`} onClick={onOptionClick}>
      <div className={style.itemIcon}>{icon}</div>
      <div className="flex flex-col">
        <div className={style.itemTitle}>{title}</div>
        <div className={style.itemDesc}>{desc}</div>
      </div>
    </div>
  );
};
