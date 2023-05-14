import styled from "@emotion/styled";
import React, { FC, memo } from "react";
import { card } from "../../globalStyle/card";
import { ReactComponent as DeleteSvg } from "../../assets/svg/modal-delete-icon.svg";
import { fontStyle } from "../../globalStyle/fonts";
import { mq } from "../../globalStyle/responsive";
import RegularButton from "../UI/RegularButton";

type TypeConfirmAlert = {
  fromItem: string;
  itemTitle: string;
  onBack: () => void;
  onConfirm: () => Promise<void>;
};
const Wrapper = styled.div(card, {
  position: "fixed",
  zIndex: 31,
  width: "320px",
  height: "300px",
  display: "flex",
  flexDirection: "column",
  padding: "0 38px",
  [mq[1] as string]: {
    width: "490px",
    height: "355px",
  },
});
const Header = styled.div({
  flex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const Body = styled.div({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const Description = styled.p(fontStyle, {
  fontSize: "14px",
  fontWeight: 500,
  textAlign: "center",
});
const Footer = styled.div({
  flex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
});

const ConfirmAlert: FC<TypeConfirmAlert> = ({
  fromItem,
  itemTitle,
  onBack,
  onConfirm,
}) => {
  return (
    <Wrapper data-cy="modal-delete">
      <Header>
        <DeleteSvg
          data-cy="modal-delete-icon"
          css={{
            width: "62px",
            height: "62px",
            [mq[2] as string]: {
              width: "84px",
              height: "84px",
            },
          }}
        />
      </Header>
      <Body>
        <Description data-cy="modal-delete-title">
          Apakah anda yakin menghapus {fromItem} &nbsp;
          <b>
            <q>{itemTitle}</q>?
          </b>
        </Description>
      </Body>
      <Footer>
        <RegularButton
          dataCy="modal-delete-cancel-button"
          type="button"
          backgroundColor="#F4F4F4"
          onClick={onBack}
          text="Batal"
          textColor="#4A4A4A"
        />
        <RegularButton
          dataCy="modal-delete-confirm-button"
          type="button"
          backgroundColor="#ED4C5C"
          onClick={onConfirm}
          text="Hapus"
          textColor="#FFFFFF"
        />
      </Footer>
    </Wrapper>
  );
};

export default memo(ConfirmAlert);
