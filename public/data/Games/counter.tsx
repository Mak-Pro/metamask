"use client";
import { useState } from "react";

export const IframeContent = () => {
  const [counter, setCounter] = useState<number>(0);

  const incrementCounter = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);

    window.parent.postMessage(
      { type: "UPDATE_COUNTER", counter: newCounter },
      window.location.origin
    );
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Iframe Counter: {counter}</h2>
      <button onClick={incrementCounter}>Increase</button>
    </div>
  );
};
