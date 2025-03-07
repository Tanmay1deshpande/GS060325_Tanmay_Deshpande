import React from "react";
import styles from "./Buttons.module.css";

type Props = {
  label: string;
  type?: "submit" | "reset" | "button";
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonPrimary: React.FC<Props> = ({
  label,
  type = "button",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={styles.button_primary}
      type={type}
      // style={{ background: "red" }}
    >
      {label}
    </button>
  );
};

export default ButtonPrimary;
