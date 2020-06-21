import React from "react";
import classNames from "classnames";

export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}

export enum ButtonType {
  Primary = "primary",
  Defalut = "default",
  Danger = "danger",
  Link = "link",
}

interface IBaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  buttonType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

type NativeButonProps = React.ButtonHTMLAttributes<HTMLElement>;

type NativeAchorProps = React.AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeAchorProps & NativeButonProps> &
  IBaseButtonProps;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    disabled,
    size,
    buttonType,
    children,
    href,
    ...restProps
  } = props;

  const classes = classNames("btn", className, {
    [`btn-${buttonType}`]: buttonType,
    [`btn-${size}`]: size,
    disabled: disabled,
  });

  if (buttonType === ButtonType.Link) {
    return (
      <a className={classes} {...restProps} href={href ? href : "#"}>
        {children}
      </a>
    );
  } else {
    return (
      <button {...restProps} className={classes}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  buttonType: ButtonType.Defalut,
};

export default Button;
