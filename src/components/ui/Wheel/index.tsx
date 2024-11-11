"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTelegram } from "@/providers/telegram";
import { useState, useEffect, useRef } from "react";
// import { Button, Tooltip } from "@/components";
import styles from "./style.module.scss";
import clsx from "clsx";
import { spinController } from "@/api";

interface WheelSlice {
  id: string | number;
  color?: string;
  value?: string | number;
  prefix?: string;
  suffix?: string;
  icon?: string;
  type?: "Points" | "Power" | "Agility" | "Stamina" | string;
}

export const Wheel = ({
  data,
  size,
  winner,
  cover,
  logo,
  duration,
  className,
}: {
  data: WheelSlice[];
  size?: number;
  winner: number;
  cover?: string;
  logo?: string;
  duration?: number;
  className?: string;
}) => {
  const { user } = useTelegram();
  const router = useRouter();
  const roulette = useRef<HTMLDivElement>(null);
  const rouletteInner = useRef<HTMLImageElement>(null);
  const [spin, setSpin] = useState(false);
  const [finish, setFinish] = useState(false);
  const [win, setWin] = useState(winner);

  let zoneSize = 360 / data.length;
  const rotationLoops = 4;
  const diameter = size ? size + 4 : 544;
  const numberOfSlices = data.length;
  const radius = diameter / 2;
  const circumfrance = 6.283185307 * radius;
  const sliceHeight = circumfrance / numberOfSlices;
  const sliceOffeset = sliceHeight / 2;
  const rotation = 360 / numberOfSlices;

  useEffect(() => {
    if (roulette.current !== null && rouletteInner.current !== null) {
      roulette.current.addEventListener("transitionend", () => {
        roulette!.current!.style.transition = "none";
        roulette!.current!.style.transform = `rotate(${win * zoneSize}deg)`;
        rouletteInner!.current!.style.transition = "none";
        rouletteInner!.current!.style.transform = `rotate(${
          win * zoneSize
        }deg)`;
        setFinish(true);
      });
    }
  }, [win]);

  const handleSpin = () => {
    if (user) {
      spinController(user.id, "/claim");
    }
    setFinish(false);
    setSpin(true);
    if (roulette.current !== null && rouletteInner.current !== null) {
      roulette.current.style.transition = `all ${
        duration ? duration : 5
      }s cubic-bezier(0.3,0,0,1)`;
      roulette.current.style.transform = `rotate(${
        360 * rotationLoops + win * zoneSize
      }deg)`;

      rouletteInner.current.style.transition = `all ${
        duration ? duration : 5
      }s cubic-bezier(0.3,0,0,1)`;
      rouletteInner.current.style.transform = `rotate(${
        360 * rotationLoops + win * zoneSize
      }deg)`;
    }
  };

  return (
    <>
      <div className={clsx(styles.roulette__section, className && className)}>
        <Image
          src="/icons/wheel-pointer.svg"
          width={41}
          height={35}
          alt="grid"
          className={clsx(
            styles.roulette__section_pointer,
            finish && styles.roulette__section_pointer_animated
          )}
        />
        <Image
          src={"/icons/wheel-inner.svg"}
          width={286}
          height={285}
          alt="inner"
          className={styles.roulette__section_overlay}
          ref={rouletteInner}
        />
        <div
          className={clsx(
            styles.roulette__section_winner_info,
            finish && styles.roulette__section_winner_info_show
          )}
        >
          <Image
            src={"/icons/wheel-win-slice.svg"}
            width={125}
            height={71}
            alt="winner-slice"
          />
          <div>
            <span>
              {data.filter((slice) => +slice.id === win)[0].prefix}
              {data.filter((slice) => +slice.id === win)[0].value}
              {data.filter((slice) => +slice.id === win)[0].suffix}
            </span>
            <i>
              {data.filter((slice) => +slice.id === win)[0].type}
              {data.filter((slice) => +slice.id === win)[0].type ===
              "Points" ? (
                <Image
                  src="/icons/coin-icon.svg"
                  width={11}
                  height={11}
                  alt={"type"}
                />
              ) : data.filter((slice) => +slice.id === win)[0].type ===
                "Power" ? (
                <Image
                  src="/icons/robot-power-icon.svg"
                  width={11}
                  height={11}
                  alt={"type"}
                />
              ) : data.filter((slice) => +slice.id === win)[0].type ===
                "Agility" ? (
                <Image
                  src="/icons/robot-agility-icon.svg"
                  width={12}
                  height={12}
                  alt={"type"}
                />
              ) : data.filter((slice) => +slice.id === win)[0].type ===
                "Stamina" ? (
                <Image
                  src="/icons/robot-stamina-icon.svg"
                  width={14}
                  height={14}
                  alt={"type"}
                />
              ) : null}
            </i>
          </div>
        </div>

        <div className={styles.roulette__section_spinner}>
          <div className={styles.roulette__section_spinner_inner}>
            {data.length >= 4 ? (
              <>
                <div
                  className={styles.roulette__wrapper}
                  style={{
                    width: `${diameter - 4}px`,
                    height: `${diameter - 4}px`,
                    transform: `rotate(${360 / 4 + rotation}deg)`,
                  }}
                >
                  {cover && (
                    <Image
                      src={cover}
                      fill
                      alt="cover"
                      className={styles.roulette__cover}
                      style={{ transform: `rotate(-${360 / 4 + rotation}deg)` }}
                    />
                  )}
                  {logo && (
                    <Image
                      src={logo}
                      width={40}
                      height={40}
                      alt="logo"
                      className={styles.roulette__logo}
                      style={{ transform: `rotate(-${360 / 4 + rotation}deg)` }}
                    />
                  )}
                  <div className={styles.roulette} ref={roulette}>
                    {data.map((slice, i) => (
                      <div
                        key={slice.id}
                        className={clsx(
                          styles.roulette__slice,
                          finish &&
                            +slice.id === winner &&
                            styles.roulette__slice_winner
                        )}
                        style={{
                          height: `${sliceHeight}px`,
                          top: `calc(50% - ${sliceOffeset + 1}px)`,
                          transform: `rotate(calc(${rotation}deg * ${i}))`,
                        }}
                      >
                        <span
                          className={styles.roulette__slice_bg}
                          style={{
                            borderRight: `${radius}px solid ${data[i].color}`,
                            borderTop:
                              data.length < 12 && data.length >= 6
                                ? `${sliceHeight / 2 - 2}px solid transparent`
                                : data.length < 6
                                  ? `${
                                      sliceHeight / 2 + sliceHeight * 0.14
                                    }px solid transparent`
                                  : `${sliceHeight / 2 + 2}px solid transparent`,
                            borderBottom:
                              data.length < 12 && data.length >= 6
                                ? `${
                                    sliceHeight / 2 + sliceHeight * 0.06
                                  }px solid transparent`
                                : data.length < 6
                                  ? `${
                                      sliceHeight / 2 + sliceHeight * 0.14
                                    }px solid transparent`
                                  : `${sliceHeight / 2 + 2}px solid transparent`,
                          }}
                        ></span>
                        {(slice.value || slice.icon) && (
                          <div className={styles.roulette__slice_content}>
                            {slice.icon && (
                              <Image
                                src={`/images/${slice.icon}`}
                                width={32}
                                height={32}
                                alt={slice.suffix ? slice.suffix : "icon"}
                              />
                            )}

                            {slice.value && (
                              <>
                                <span>
                                  {slice.prefix}
                                  {slice.value}
                                  {slice.suffix}
                                </span>
                                <i>
                                  {slice.type}
                                  {slice.type === "Points" ? (
                                    <Image
                                      src="/icons/coin-icon.svg"
                                      width={11}
                                      height={11}
                                      alt={slice.type}
                                    />
                                  ) : slice.type === "Power" ? (
                                    <Image
                                      src="/icons/robot-power-icon.svg"
                                      width={11}
                                      height={11}
                                      alt={slice.type}
                                    />
                                  ) : slice.type === "Agility" ? (
                                    <Image
                                      src="/icons/robot-agility-icon.svg"
                                      width={12}
                                      height={12}
                                      alt={slice.type}
                                    />
                                  ) : slice.type === "Stamina" ? (
                                    <Image
                                      src="/icons/robot-stamina-icon.svg"
                                      width={14}
                                      height={14}
                                      alt={slice.type}
                                    />
                                  ) : null}
                                </i>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div>The Number of Roulette Slices is lower than 4</div>
            )}
          </div>
        </div>
        {/* {data.length > 0 && (
          <div className={styles.roulette__actions}>
            {finish && (
              <Tooltip>
                <>
                  <h5>You Win</h5>
                  <h2>
                    {data.filter((slice) => +slice.id === win)[0].prefix}
                    {data.filter((slice) => +slice.id === win)[0].value}
                    {data.filter((slice) => +slice.id === win)[0].suffix}
                  </h2>
                  <span>
                    {data.filter((slice) => +slice.id === win)[0].type}
                    {data.filter((slice) => +slice.id === win)[0].type ===
                    "Points" ? (
                      <Image
                        src="/icons/coin-icon.svg"
                        width={11}
                        height={11}
                        alt={"type"}
                      />
                    ) : data.filter((slice) => +slice.id === win)[0].type ===
                      "Power" ? (
                      <Image
                        src="/icons/robot-power-icon.svg"
                        width={11}
                        height={11}
                        alt={"type"}
                      />
                    ) : data.filter((slice) => +slice.id === win)[0].type ===
                      "Agility" ? (
                      <Image
                        src="/icons/robot-agility-icon.svg"
                        width={12}
                        height={12}
                        alt={"type"}
                      />
                    ) : data.filter((slice) => +slice.id === win)[0].type ===
                      "Stamina" ? (
                      <Image
                        src="/icons/robot-stamina-icon.svg"
                        width={14}
                        height={14}
                        alt={"type"}
                      />
                    ) : null}
                  </span>
                  <Button
                    size="medium"
                    variant="filled"
                    bgColor={"var(--button-bg-primary)"}
                    textColor={"var(--button-text-primary)"}
                    radius={0}
                    onClick={() => router.replace("/")}
                  >
                    Claim
                  </Button>
                </>
              </Tooltip>
            )}

            {!finish && (
              <Button
                size="medium"
                variant="filled"
                bgColor={"var(--button-bg-primary)"}
                textColor={"var(--button-text-primary)"}
                radius={0}
                onClick={handleSpin}
              >
                Spin
              </Button>
            )}
          </div>
        )} */}
      </div>
      <svg
        height="0"
        width="0"
        className="svg-clip"
        style={{ position: "absolute" }}
      >
        <defs>
          <clipPath id="clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L1,0 1,1 0,1 0,0M.75,.5A.25,.25 0 1 0 .25,.5A.25,.25 0 1 0 .75,.5z" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};
