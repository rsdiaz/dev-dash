import React from "react";
import { socket } from "../socket";
import { bytesToGigabytes } from "../utils/bytesToGigabytes";

export const Context = React.createContext<any>(null);

export const Provider = ({ children }: any) => {

  const [systemInfo, setSystemInfo] = React.useState<any>({});

  React.useEffect(() => {
    function onFooEvent(value: any) {
      setSystemInfo(value);
    }
    socket.on("systemInfo", (info) => onFooEvent(info));

    return () => {
      socket.off("foo", onFooEvent);
    };
  }, [systemInfo]);


  const value = React.useMemo(() => ({ 
    systemInfo,
    bytesToGigabytes
  }), [systemInfo]);

  // console.log("systemInfo", systemInfo);
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

