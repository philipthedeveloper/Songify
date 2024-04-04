import { CSSProperties, PropsWithChildren } from "react";
import classNames from "classnames";
import googleIcon from "@/assets/icons/32/google-32.png";

const defaultStyles =
  "text-center text-sm py-3 px-4 bg-[var(--base-color)] text-white w-full rounded-md font-medium hover:py-[10px] flex items-center justify-center";

interface ButtonProps extends PropsWithChildren {
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  className?: string; // tailwind/bootstrap classes
  onClick?: () => any;
}

const Button = ({
  type,
  disabled,
  children,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={classNames(defaultStyles, className)}
      type={type || "button"}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface OauthButtonProps extends PropsWithChildren {
  type: "google" | "facebook";
  disabled?: boolean;
  className?: string; // tailwind/bootstrap classes
  onClick?: () => any;
  style?: CSSProperties;
}
const oauthBtnDefaultStyles =
  "text-center text-sm py-[10px] px-4 bg-white text-gray-600 w-full rounded-md font-medium flex items-center justify-center gap-4 border-[2px] outline-none border-[#ececec] text-gray-500 font-medium cursor-pointer";

export const OauthButton = ({
  type,
  children,
  onClick,
  disabled,
  className,
  style,
}: OauthButtonProps) => {
  return (
    <button
      className={classNames(oauthBtnDefaultStyles, className)}
      type={"button"}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {type && type === "google" && (
        <img src={googleIcon} width={20} height={20} />
      )}
      {children}
    </button>
  );
};

export default Button;
