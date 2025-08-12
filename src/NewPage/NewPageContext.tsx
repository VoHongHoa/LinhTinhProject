import React, { createContext, PropsWithChildren, useState } from "react";

interface INewPageContextProps {}

const NewPageContext = createContext<INewPageContextProps>(
  {} as INewPageContextProps
);

const NewPageContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
    
  const contextValue: INewPageContextProps = {};
  return (
    <NewPageContext.Provider value={contextValue}>
      {children}
    </NewPageContext.Provider>
  );
};
export { NewPageContext, NewPageContextProvider };
