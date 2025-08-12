import React, { createContext, PropsWithChildren } from "react";

interface ILayoutContextProps {}

const LayoutContext = createContext<ILayoutContextProps>(
  {} as ILayoutContextProps
);

const LayoutContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
    
  const contextValue: ILayoutContextProps = {};
  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
};
export { LayoutContext, LayoutContextProvider };
