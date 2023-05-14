import styled from "@emotion/styled";
import React, { FC, memo } from "react";
import { fontStyle } from "../../../../globalStyle/fonts";
import { mq } from "../../../../globalStyle/responsive";
import AddButton from "../../../UI/AddButton";

const Container = styled.div({
  display: "flex",
  justifyContent: "space-between",
});
const Title = styled.h2(fontStyle, {
  textTransform: "capitalize",
  fontSize: "16px",
  fontWeight: 700,
  color: "#111111",
  [mq[2] as string]: {
    fontSize: "36px",
  },
});
const HeaderActivity: FC<{ onClick: () => Promise<void> }> = ({ onClick }) => {
  return (
    <Container>
      <Title data-cy="activity-title">Activity</Title>
      <AddButton dataCy="activity-add-button" onClick={onClick} />
    </Container>
  );
};

export default memo(HeaderActivity);
