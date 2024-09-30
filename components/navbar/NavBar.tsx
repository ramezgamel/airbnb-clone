import React, { Suspense } from "react";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import DarkMode from "./DarkMode";
import LinksDropDown from "./LinksDropDown";

export default function NavBar() {
  return (
    <nav className="border-b">
      <div className="container py-8 flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4">
        <Logo />
        <Suspense>
          <NavSearch />
        </Suspense>
        <div className="flex gap-4 items-center">
          <DarkMode />
          <LinksDropDown />
        </div>
      </div>
    </nav>
  );
}
