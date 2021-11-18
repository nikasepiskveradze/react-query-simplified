import React from "react";

export const context = React.createContext();

export const QueryClientProvider = ({ children, client }) => {
  return <context.Provider value={client}>{children}</context.Provider>;
};

export default QueryClientProvider;
