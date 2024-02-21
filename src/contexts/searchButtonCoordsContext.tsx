"use client";

import React, { SetStateAction, createContext, useState } from "react";

/** [x, y, width, height] */
export type Coords = [number, number, number, number];

export const searchButtonCoordsContext: React.Context<[Coords, React.Dispatch<React.SetStateAction<Coords>>]> =
  createContext<[Coords, React.Dispatch<React.SetStateAction<Coords>>]>([
    [0, 0, 0, 0],
    (newState: SetStateAction<Coords>) => {
      return newState;
    },
  ]);

export const SearchButtonCoordsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [searchButtonCoords, setSearchButtonCoords] = useState<Coords>([0, 0, 0, 0]);

  return (
    <searchButtonCoordsContext.Provider value={[searchButtonCoords, setSearchButtonCoords]}>
      {children}
    </searchButtonCoordsContext.Provider>
  );
};
