import React, { createContext, PropsWithChildren, useState } from "react";

interface IMTExportDataContextProps {}

const MTExportDataContext = createContext<IMTExportDataContextProps>(
  {} as IMTExportDataContextProps
);

const MTExportDataContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
    
  const contextValue: IMTExportDataContextProps = {};
  return (
    <MTExportDataContext.Provider value={contextValue}>
      {children}
    </MTExportDataContext.Provider>
  );
};
export { MTExportDataContext, MTExportDataContextProvider };
