"use client";

import { searchBarIsOpenContext } from "@/contexts/searchBarOpenContext";
import React, { useContext } from "react";

const ScrollHelper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [searchBarIsOpen, setSearchBarIsOpen] = useContext(searchBarIsOpenContext);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflowY: searchBarIsOpen ? "hidden" : "scroll",
        overflowX: "hidden",
      }}
    >
      {children}
    </div>
  );
};

export default ScrollHelper;
