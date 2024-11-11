"use client";
import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export const Wallet = () => {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (typeof window !== undefined) {
      window.open = (function (open) {
        return function (url, _, features) {
          return open.call(window, url, "_blank", features);
        };
      })(window.open);
    }
  }, []);

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.length > 0 &&
          connectors.map((connector, i) => {
            if (connector.id === "walletConnect") {
              return (
                <button
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  type="button"
                >
                  {/* {connector.name} */}
                  button
                </button>
              );
            }
          })}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  );
};
