import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Outlet, useParams } from "react-router-dom";
import { mq } from "../../globalStyle/responsive";

const Container = styled.main<{ param: boolean }>(({ param }) => ({
  padding: "28px 1.3rem",
  display: "flex",
  alignItems: param ? "unset" : "center",
  flexDirection: param ? "unset" : "column",
  justifyContent: param ? "center" : "unset",
  [mq[2] as string]: {
    paddingTop: "49px !important",
    padding: "var(--mq-1200)",
  },
}));
const Wrapper = styled.div<{ param: boolean }>(({ param }) => ({
  maxWidth: "1002px",
  width: param ? "1002px" : "unset",
}));

const Main = () => {
  const params = useParams();
  const [param, setParam] = useState<boolean>(false);
  useEffect(() => {
    setParam(() => Object.keys(params)[0] === "id");
  }, [params]);
  return (
    <Container param={param}>
      <Wrapper param={param}>
        <Outlet />
      </Wrapper>
    </Container>
  );
};

export default Main;
