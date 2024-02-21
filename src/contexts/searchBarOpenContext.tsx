"use client";

import React, { SetStateAction, createContext, useState } from "react";

export const searchBarIsOpenContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([
  false,
  (newState: SetStateAction<boolean>) => {
    return newState;
  },
]);

export const SearchBarIsOpenProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);

  return (
    <searchBarIsOpenContext.Provider value={[searchBarIsOpen, setSearchBarIsOpen]}>
      {children}
    </searchBarIsOpenContext.Provider>
  );
};
