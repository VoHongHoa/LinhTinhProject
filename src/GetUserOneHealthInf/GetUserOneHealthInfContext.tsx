import React, { createContext, PropsWithChildren, useState } from "react";

interface IGetUserOneHealthInfContextProps {}

const GetUserOneHealthInfContext = createContext<IGetUserOneHealthInfContextProps>(
  {} as IGetUserOneHealthInfContextProps
);

const GetUserOneHealthInfContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
    
  const contextValue: IGetUserOneHealthInfContextProps = {};
  return (
    <GetUserOneHealthInfContext.Provider value={contextValue}>
      {children}
    </GetUserOneHealthInfContext.Provider>
  );
};
export { GetUserOneHealthInfContext, GetUserOneHealthInfContextProvider };
