"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTelegram } from "@/providers/telegram";
import { Wheel, Spacer } from "@/components";
import styles from "./style.module.scss";
import { spinController } from "@/api";

export const WheelOfFortune = () => {
  const roulette = [
    {
      id: "0",
      color: "#9EDCEF",
      value: 150,
      type: "Points",
      prefix: "+",
      suffix: "",
    },
    {
      id: "1",
      color: "#D8F3FF",
      value: 50,
      type: "Agility",
      prefix: "+",
      suffix: "%",
    },
    {
      id: "2",
      color: "#9EDCEF",
      value: 50,
      type: "Points",
      prefix: "+",
      suffix: "",
    },
    {
      id: "3",
      color: "#D8F3FF",
      value: 2,
      type: "Power",
      prefix: "X",
      suffix: "",
    },
    {
      id: "4",
      color: "#9EDCEF",
      value: 50,
      type: "Points",
      prefix: "+",
      suffix: "%",
    },
    {
      id: "5",
      color: "#D8F3FF",
      value: 2,
      type: "Stamina",
      prefix: "X",
      suffix: "",
    },
    {
      id: "6",
      color: "#9EDCEF",
      value: 100,
      type: "Points",
      prefix: "+",
      suffix: "",
    },
    {
      id: "7",
      color: "#D8F3FF",
      value: 50,
      type: "Power",
      prefix: "+",
      suffix: "%",
    },
  ];

  const { user } = useTelegram();
  const [wheelPlayer, setWheelPlayer] = useState<any>(null);
  const [winner, setWinner] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (user) {
      spinController(user.id, "/result").then((data) => {
        const { spinId } = data;
        setWinner(`${spinId}`);
      });
    }
  }, [user]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/scripts/spine-player.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const spine = (window as any).spine;

      // grid animation
      if (spine && winner) {
        const wheelPlayer = new spine.SpinePlayer("wheel-outer", {
          skeleton: "/data/animations/wheel.json",
          atlas: "/data/animations/wheel.atlas",
          animation: "animation",
          showControls: false,
          showLoading: false,
          alpha: true,
          success: (player: any) => {
            setWheelPlayer(player);
          },
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [winner]);

  return (
    <>
      <div className={styles.wheel}>
        <Spacer space={20} />
        <h2 className={styles.wheel__title}>Wheel of fortune</h2>
        <Spacer space={4} />
        <p>
          Test your luck and win amazing prizes! Spin the wheel for free every
          day
        </p>
        <Spacer space={24} />
        {winner && (
          <div className={styles.wheel__box}>
            <Image
              src="/icons/wheel-bg-grid.svg"
              width={316}
              height={441}
              alt="grid"
              className={styles.wheel__box_grid}
            />
            <div id="wheel-outer" className={styles.wheel__box_outer}></div>
            <Image
              src="/icons/wheel-outer-static.svg"
              width={358}
              height={370}
              alt="outer"
              className={styles.wheel__box_outer_static}
            />
            <Wheel
              data={roulette.reverse()}
              size={286}
              winner={+winner}
              className={styles.wheel__roulette}
            />
          </div>
        )}
      </div>
    </>
  );
};
