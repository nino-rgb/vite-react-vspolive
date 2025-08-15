import React, { useState, createContext, ReactNode } from "react";

interface ArchiveIdContextProps {
  archiveId: number;
  setArchiveId: React.Dispatch<React.SetStateAction<number>>;
}

export const ArchiveIdContext = createContext<ArchiveIdContextProps>({
  archiveId: 0,
  setArchiveId: () => console.warn("not implemnt"),
});

export const ArchiveIdProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [archiveId, setArchiveId] = useState(0);

  return (
    <ArchiveIdContext.Provider
      value={{
        archiveId,
        setArchiveId,
      }}
    >
      {children}
    </ArchiveIdContext.Provider>
  );
};
