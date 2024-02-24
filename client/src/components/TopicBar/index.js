import React from "react";
import style from "./style.module.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { ReactComponent as Avatar } from "assets/icons/AI-Avatar.svg";

export default function TopicBar({ topic, isLoading }) {
  return (
    <div className="flex gap-2 items-center w-full">
      <Avatar className="w-9" />
      <div
        className={`font-semibold text-sm rounded-lg px-5 py-5 w-full ${style.shadow}`}
      >
        {topic || !isLoading ? (
          topic
        ) : (
          <div className="flex flex-col z-0 relative">
            <Skeleton height={10} borderRadius={10} />
            <Skeleton height={10} borderRadius={10} />
          </div>
        )}
      </div>
    </div>
  );
}
