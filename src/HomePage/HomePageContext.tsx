import React, { createContext, PropsWithChildren } from "react";

interface IHomePageContextProps {}

const HomePageContext = createContext<IHomePageContextProps>(
  {} as IHomePageContextProps
);

const HomePageContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
    
  const contextValue: IHomePageContextProps = {};
  return (
    <HomePageContext.Provider value={contextValue}>
      {children}
    </HomePageContext.Provider>
  );
};
export { HomePageContext, HomePageContextProvider };
