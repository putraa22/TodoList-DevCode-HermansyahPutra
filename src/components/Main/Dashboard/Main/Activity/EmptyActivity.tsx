import styled from "@emotion/styled";
import React, { FC, memo } from "react";
import { ReactComponent as EmptyActivitySvg } from "../../../../../assets/svg/activity-empty-state.svg";
import { mq } from "../../../../../globalStyle/responsive";

const Wrapper = styled.div({
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  paddingTop: "59px",
});
const EmptyActivity: FC<{ onClick: () => Promise<void> }> = ({ onClick }) => {
  return (
    <Wrapper onClick={onClick} data-cy="activity-empty-state">
      <EmptyActivitySvg
        css={{
          width: "319px",
          height: "204px",
          [mq[2] as string]: {
            width: "767px",
            height: "490px",
          },
        }}
      />
    </Wrapper>
  );
};

export default memo(EmptyActivity);
