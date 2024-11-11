import { useState, useEffect } from "react";

export const IframeTest = () => {
  const [counter, setCounter] = useState<number>(0);
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data && event.data.type === "UPDATE_COUNTER") {
        setCounter(event.data.counter);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div>
      <h1>Счетчик в iframe: {counter}</h1>
      <iframe
        src="/games/counter"
        title="Example Iframe"
        width="400"
        height="300"
        style={{ border: "1px solid black" }}
      />
    </div>
  );
};
