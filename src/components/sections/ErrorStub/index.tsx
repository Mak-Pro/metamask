"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components";
import styles from "./style.module.scss";

interface ErrorStubProps {
  image?: string;
  title?: string;
  text?: string;
  buttonText?: string;
  onClick?: () => void;
  className?: string;
}

export const ErrorStub = ({
  image,
  title,
  text,
  buttonText,
  onClick,
  className,
}: ErrorStubProps) => {
  const router = useRouter();
  return (
    <div className={`${styles.error} ${className ? className : ""}`}>
      <div className={styles.error__content}>
        <div className={styles.error__content_image}>
          {/* <Image
            src={image ? image : "/images/error-img.png"}
            fill
            alt="error"
          /> */}
        </div>
        <div className={styles.error__content_text}>
          <h2 className={styles.error__content_text_title}>
            {title ? title : "Oops!"}
          </h2>
          <p>{text ? text : `Page hasn't been loaded`}</p>
        </div>
      </div>
      <div className={styles.error__actions}>
        <Button
          onClick={onClick ? () => onClick() : () => router.refresh()}
          size="medium"
          variant="filled"
          textColor="var(--button-text-primary)"
          bgColor="var(--button-bg-primary)"
          radius={0}
        >
          {buttonText ? buttonText : "Reload Page"}
        </Button>
      </div>
    </div>
  );
};
