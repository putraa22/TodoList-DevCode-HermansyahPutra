import styled from "@emotion/styled";
import React, { FC, memo } from "react";
import { ReactComponent as InformationSvg } from "../../assets/svg/modal-information-icon.svg";
import { card } from "../../globalStyle/card";
import { fontStyle } from "../../globalStyle/fonts";
import { mq } from "../../globalStyle/responsive";

type TypeInformAlert = {
  fromItem: string;
};
const WrapperInformAlert = styled.div(card, {
  position: "fixed",
  zIndex: 31,
  width: "323px",
  height: "58px",
  padding: "17px 27px",
  display: "flex",
  columnGap: "13px",
  alignItems: "center",
  [mq[2] as string]: {
    width: "490px",
  },
});
const Description = styled.p(fontStyle, {
  fontSize: "14px",
  fontWeight: 500,
});
const InformAlert: FC<TypeInformAlert> = ({ fromItem }) => {
  return (
    <WrapperInformAlert data-cy="modal-information">
      <InformationSvg data-cy="modal-information-icon" />
      <Description data-cy="modal-information-title">
        {fromItem} berhasil dihapus
      </Description>
    </WrapperInformAlert>
  );
};

export default memo(InformAlert);
