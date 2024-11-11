"use client";
import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextProvider } from "./context";
import { TelegramProvider } from "./telegram";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TelegramProvider>
      <AppContextProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      </AppContextProvider>
    </TelegramProvider>
  );
};
