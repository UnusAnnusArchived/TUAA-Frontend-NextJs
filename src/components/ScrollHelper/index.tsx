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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

export default ScrollHelper;
