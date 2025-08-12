import React, { createContext, PropsWithChildren, useState } from "react";

interface ICompareInfContextProps {}

const CompareInfContext = createContext<ICompareInfContextProps>(
  {} as ICompareInfContextProps
);

const CompareInfContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
    
  const contextValue: ICompareInfContextProps = {};
  return (
    <CompareInfContext.Provider value={contextValue}>
      {children}
    </CompareInfContext.Provider>
  );
};
export { CompareInfContext, CompareInfContextProvider };
