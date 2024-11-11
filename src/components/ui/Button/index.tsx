"use client";
import { useEffect, useRef, MouseEvent } from "react";
import Link from "next/link";
import clsx from "clsx";
// import SpinnerIcon from "@public/icons/spinner.svg";
import styles from "./style.module.scss";
import { ButtonProps } from "@/Types";

export const Button = ({
  children,
  size,
  variant,
  type,
  bgColor,
  textColor,
  href,
  onClick,
  linkClick,
  target,
  className,
  disabled,
  radius,
  loading,
}: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  function mousePositionToCustomProp(
    event: MouseEvent<HTMLElement>,
    element: HTMLElement
  ) {
    let rect = event.currentTarget.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    element.style.setProperty("--x", x + "px");
    element.style.setProperty("--y", y + "px");
  }

  useEffect(() => {}, [buttonRef]);

  const ripple = (e: MouseEvent<HTMLElement>) => {
    if (buttonRef && buttonRef.current) {
      mousePositionToCustomProp(
        e as MouseEvent<HTMLElement>,
        buttonRef.current
      );
      buttonRef.current.classList.add(`${styles.pulse}`);
      buttonRef.current.addEventListener(
        "animationend",
        () => {
          buttonRef.current &&
            buttonRef.current.classList.remove(`${styles.pulse}`);
        },
        { once: true }
      );
    }
  };

  return (
    <button
      ref={buttonRef}
      type={type ? type : "button"}
      onClick={onClick}
      onMouseDown={(e) => {
        ripple(e as any);
      }}
      className={clsx(
        styles.button,
        size === "small"
          ? styles.button__small
          : size === "large"
          ? styles.button__large
          : styles.button__medium,
        variant === "filled"
          ? styles.button__filled
          : variant === "outlined"
          ? styles.button__outlined
          : styles.button__text,
        disabled && styles.button__disabled,
        loading && styles.button__loading,
        className && className
      )}
      style={{
        color: clsx(textColor ? textColor : "var(--black)"),
        backgroundColor: clsx(
          variant === "filled" && bgColor ? bgColor : "transparent"
        ),
        borderRadius: clsx(
          variant !== "text" && radius
            ? `${radius}px`
            : variant !== "text" && !radius && radius !== 0 && "100px"
        ),
        borderColor: clsx(
          (variant === "outlined" || variant === "filled") && bgColor
        ),
      }}
    >
      {href && (
        <Link
          href={href}
          target={target ? target : "_blank"}
          onClick={linkClick}
        >
          link
        </Link>
      )}

      {loading && (
        <span className={styles.button__spinner}>{/* <SpinnerIcon /> */}</span>
      )}

      <span className={styles.button__inner}>{children}</span>
    </button>
  );
};
