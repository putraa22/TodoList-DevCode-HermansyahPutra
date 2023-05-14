import styled from "@emotion/styled";
import React, { memo } from "react";
import { ReactComponent as PlusSvg } from "../../assets/svg/tabler_plus.svg";
import { button } from "../../globalStyle/button";
import { fontStyle } from "../../globalStyle/fonts";
import { mq } from "../../globalStyle/responsive";

type TypeAddButton = {
  dataCy: string;
  onClick: () => void;
};
const Button = styled.button(button, {
  position: "relative",
  display: "flex",
  alignItems: "center",
  background: "var(--primary-color)",
  width: "100px",
  height: "37px",
  padding: "0px 14px",
  [mq[2] as string]: {
    width: "159px",
    height: "54px",
    padding: "0px 21px",
  },
});
const Text = styled.p(fontStyle, {
  position: "absolute",
  textTransform: "capitalize",
  width: "100%",
  fontSize: "12px",
  left: 10,
  fontWeight: 600,
  color: "#FFFFFF",
  [mq[2] as string]: {
    fontSize: "16px",
  },
});
const AddButton: React.FC<TypeAddButton> = ({ dataCy, onClick }) => {
  return (
    <Button type="submit" data-cy={dataCy} onClick={onClick}>
      <PlusSvg
        css={{
          width: "12px",
          height: "12px",
          [mq[2] as string]: {
            width: "24px",
            height: "24px",
          },
        }}
      />
      <Text>Tambah</Text>
    </Button>
  );
};

export default memo(AddButton);
