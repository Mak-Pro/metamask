import { HTMLAttributeAnchorTarget } from "react";
type ButtonSize = "small" | "medium" | "large";
type ButtonVariant = "text" | "outlined" | "filled";
type ButtonType = "button" | "submit" | "reset";
export type ModalStatusTypes = "register" | "delete";

export interface ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  type?: ButtonType;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: () => void;
  linkClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  bgColor?: string;
  textColor?: string;
  radius?: number;
}

export interface ModalProps {
  status: ModalStatusTypes;
  show: boolean;
}

export interface CountdownTimerProps {
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  note?: string;
  targetDate: string;
  className?: string;
}
