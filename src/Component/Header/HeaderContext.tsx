import React, { createContext, PropsWithChildren, useState } from "react";

interface IHeaderContextProps {}

const HeaderContext = createContext<IHeaderContextProps>(
  {} as IHeaderContextProps
);

const HeaderContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
    
  const contextValue: IHeaderContextProps = {};
  return (
    <HeaderContext.Provider value={contextValue}>
      {children}
    </HeaderContext.Provider>
  );
};
export { HeaderContext, HeaderContextProvider };
