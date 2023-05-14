import styled from "@emotion/styled";
import React, { FC, memo } from "react";
import { button } from "../../globalStyle/button";
import { fontStyle } from "../../globalStyle/fonts";
import { mq } from "../../globalStyle/responsive";

type TypeRegularButton = {
  onClick?: () => void;
  backgroundColor: string;
  textColor: string;
  text: string;
  disabled?: boolean;
  type: "button" | "submit" | "reset";
  dataCy: string;
};

const Button = styled.button<Pick<TypeRegularButton, "backgroundColor">>(
  button,
  ({ backgroundColor }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: backgroundColor,
    width: "117px",
    height: "48px",
    padding: "0px 14px",
    [mq[2] as string]: {
      width: "150px",
      height: "54px",
    },
    ":disabled": {
      opacity: "20%",
    },
  }),
);
const Text = styled.p<Pick<TypeRegularButton, "textColor">>(
  fontStyle,
  ({ textColor }) => ({
    textTransform: "capitalize",
    fontSize: "16px",
    fontWeight: 600,
    color: textColor,
    [mq[2] as string]: {
      fontSize: "18px",
    },
  }),
);
const RegularButton: FC<TypeRegularButton> = ({
  backgroundColor,
  textColor,
  text,
  onClick,
  disabled,
  type,
  dataCy,
}) => {
  return (
    <Button
      data-cy={dataCy}
      disabled={disabled}
      backgroundColor={backgroundColor}
      onClick={onClick}
      type={type}
    >
      <Text textColor={textColor}>{text}</Text>
    </Button>
  );
};

export default memo(RegularButton);
