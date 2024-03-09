import React from "react";
import { ReactComponent as Logo } from "assets/logos/ImmersiveWritingLogo.svg";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <Link to="/">
      <div className="flex items-center gap-2 p-5 border-b">
        <Logo />
        <div
          className={`flex items-center font-bold ${style.font} text-center py-2`}
        >
          Immersive Writing
        </div>
      </div>
    </Link>
  );
}
