"use client";
import Countdown, { CountdownRenderProps } from "react-countdown";
import SlotCounter from "react-slot-counter";
import styles from "./style.module.scss";
import { CountdownTimerProps } from "@/Types";
import clsx from "clsx";

export const CountdownSimple = ({
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  targetDate,
  className,
}: CountdownTimerProps) => {
  const timer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    return (
      <div className={clsx(styles.timer, className && className)}>
        {showDays && (
          <>
            <div>
              <SlotCounter value={String(days)} sequentialAnimationMode />
              <i>d</i>
            </div>
          </>
        )}

        {showHours && (
          <>
            <div>
              <SlotCounter
                value={String(hours).length > 1 ? +hours : `0${+hours}`}
                sequentialAnimationMode
              />
              <i>h</i>
            </div>
          </>
        )}

        {showMinutes && (
          <>
            <div>
              <SlotCounter
                value={String(minutes).length > 1 ? +minutes : `0${+minutes}`}
                sequentialAnimationMode
                dummyCharacterCount={0}
              />
              <i>m</i>
            </div>
          </>
        )}

        {showSeconds && (
          <>
            <div>
              <SlotCounter
                value={String(seconds).length > 1 ? +seconds : `0${+seconds}`}
                sequentialAnimationMode
                dummyCharacterCount={0}
                duration={1}
              />
              <i>s</i>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <Countdown
      date={targetDate}
      renderer={timer}
      className={clsx(className && className)}
    />
  );
};
