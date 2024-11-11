// import Spinner from "/public/icons/spinner.svg";
import styles from "./style.module.scss";
import clsx from "clsx";

export function Preloader({
  className,
  spinnerColor,
}: {
  className?: string;
  spinnerColor?: string;
}) {
  return (
    <div
      className={clsx(styles.preloader, className && className)}
      style={{
        color: clsx(spinnerColor ? spinnerColor : "var(--button-bg-primary)"),
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 180 180"
      >
        <path
          className={styles.face}
          fill="currentColor"
          d="M36.6,19.4c.3,0,.9.2,1.3.2,2.2,2.8,5.4,4.3,8.2,6.4,8.5,5.8,16.7,11.9,25.2,17.8,2.5,1.7,5.4,3.2,6.9,6,3.9,6.5,6.7,13.7,10.8,20.1,2,.5,2.4-1.8,3.2-3,2.1-4.5,4.9-8.7,6.5-13.4,2.1-3.1,4.2-6.4,7.5-8.4,11.8-8.1,23.3-16.6,35.2-24.3.2-.5.7-1.5.9-2,1.3,9,.4,18.2.6,27.3.4,3.9-4.8,5.2-4.9,8.9-.2,3.9,0,7.8,0,11.8-8.2,6.8-16.5,13.4-25,19.8-4.6,3.5-10.9,0-15.7,2.9,1.7,3.5,3.4,6.9,5.7,10.1,6.5,0,13,.9,19.6.3,1.3,3.9.8,8.1,1,12.2,0,3.5.3,7-.1,10.4-1.1,1.4-2.7,2.2-4.1,3.3,1.4,2.1,3.1,4,4.1,6.4-2.5,5.2-5.5,10.1-8.4,15-2.4,3.7-7,4.8-10.6,6.9-5,2.3-9.6,5.3-14.6,7.5-4.7-2-9.1-4.7-13.6-6.9-4.4-2.6-10.1-4-12.7-8.8-2.1-4-4.3-7.9-6.4-11.9-1.9-3.1,1.8-5.7,3.1-8.2-1.5-1.4-3.9-2.4-4.2-4.6-.4-6.9.2-13.9.7-20.8,6.8-.5,13.5-1.1,20.3-1.2,1.8-3.2,3.6-6.4,5.3-9.6-4.8-2.9-11.2.7-15.7-3-8.4-6.6-17-12.8-24.9-19.9-.2-4.3.1-8.5-.1-12.8-1-3-5.5-4.1-5.1-7.7.2-8.9-.4-17.9.4-26.7ZM77.3,116.8c.2,4.3-.8,9.8,3.5,12.5,2-2.9,5-5.1,6.5-8.3.5-4.7.2-9.4.1-14-4.2,2.2-7,6.3-10.1,9.8ZM91.9,120.9c1.6,3.5,4.9,5.8,7.3,8.8,2.3-2.7,2.9-6.2,2.7-9.6.5-6-5.4-9.2-9.1-12.9-1.7,4.4-.9,9.2-.8,13.7Z"
        />
        <path
          className={styles.head}
          fill="currentColor"
          d="M48.8,22.5c25.4-.6,50.8,0,76.2-.2,1.8,0,3.5.1,5.2.4-9.4,8.2-20.2,14.7-29.4,23-4.4,5.9-6.8,13.1-11.1,19.1-4.9-6-6.7-14-11.8-19.8-4.8-4.3-10.4-7.6-15.5-11.6-4.5-3.7-9.9-6.4-13.7-10.9ZM85.4,33.6c1.3,2.6,2.6,5.2,3.8,7.8,2.8-2.1,3.9-5.5,4.4-8.8-2.8-.3-5.6-.2-8.1,1Z"
        />
        <path
          className={clsx(styles.ear, styles.ear__left)}
          fill="currentColor"
          d="M24.3,60.6c1.2,0,2.6-.3,3.5.8,6.1,5.1,13.1,8.9,18.9,14.4-1.2,1.3-2.4,2.6-3.4,4,3.1,6.1,6.2,12.2,9.1,18.5,1.7,3.3,1.2,7.2,1.2,10.8-.1,4.1.2,8.1-.3,12.1-.8-1-1.7-1.9-2.2-3.1-6.9-15.1-13.8-30.1-20.8-45.1-1.8-4.2-3.6-8.4-6-12.3Z"
        />
        <path
          className={clsx(styles.ear, styles.ear__right)}
          fill="currentColor"
          d="M132.2,75.8c6.4-5.7,14-10,20.7-15.3,1,.5,2.1,1.1,3.1,1.5-.5.2-1.5.5-2,.6-8.1,16.6-15.6,33.5-23.2,50.3-1.4,2.8-2.1,6.2-4.9,8-.4-5.6,0-11.3-.2-16.9-.2-5.3,3.3-9.5,5.2-14.2,1.5-3.6,4-6.9,4.8-10.8-1.1-1.2-2.3-2.2-3.5-3.2Z"
        />
      </svg>
    </div>
  );
}
