import React, { createContext, useContext, useState } from "react";

const WasteContext = createContext();

export const useWaste = () => useContext(WasteContext);

function WasteProvider({ children }) {
  const [selectedWasteId, setSelectedWasteId] = useState(null);

  return (
    <WasteContext.Provider value={{ selectedWasteId, setSelectedWasteId }}>
      {children}
    </WasteContext.Provider>
  );
}

export default WasteProvider;
