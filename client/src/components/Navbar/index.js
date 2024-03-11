import React from "react";
import { ReactComponent as Logo } from "assets/logos/ImmersiveWritingLogo.svg";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className={`flex ${style.navbar} p-5 border-b`}>
      <Link to="/" className={`flex gap-2`}>
        <Logo />
        <div
          className={`flex items-center font-bold ${style.font}  text-center py-2`}
        >
          Immersive Writing
        </div>
      </Link>
    </div>
  );
}
