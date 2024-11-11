"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTelegram } from "@/providers/telegram";
import AppContext from "@/providers/context";
import { Wallet } from "@/components/wallet";

export default function Home() {
  const router = useRouter();
  const { user } = useTelegram();

  return (
    <>
      <Wallet />
    </>
  );
}
