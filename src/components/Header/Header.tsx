import styled from "@emotion/styled";
import React from "react";
import { fontStyle } from "../../globalStyle/fonts";
import { mq } from "../../globalStyle/responsive";

const Container = styled.header({
  backgroundColor: "var(--primary-color)",
  height: "64px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 20px",
  [mq[2] as string]: {
    height: "105px",
    padding: "var(--mq-1200)",
  },
});
const Wrapper = styled.div({
  width: "1002px",
});
const TextHeader = styled.h1(fontStyle, {
  color: "#FFFFFF",
  fontSize: "18px",
  fontWeight: 700,
  textTransform: "uppercase",
  [mq[2] as string]: {
    fontSize: "24px",
  },
});

const Header = () => {
  return (
    <Container>
      <Wrapper data-cy="header-background">
        <TextHeader data-cy="header-title">TO DO LIST APP</TextHeader>
      </Wrapper>
    </Container>
  );
};

export default Header;
