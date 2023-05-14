import styled from "@emotion/styled";
import React, { FC, memo } from "react";
import { ReactComponent as EmptyDetailActivitySvg } from "../../../../../assets/svg/todo-empty-state.svg";
import { mq } from "../../../../../globalStyle/responsive";

const WrapperEmptyDetailActivity = styled.div({
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  paddingTop: "80px",
});
const EmptyDetailActivity: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <WrapperEmptyDetailActivity data-cy="todo-empty-state" onClick={onClick}>
      <EmptyDetailActivitySvg
        css={{
          width: "320px",
          height: "245px",
          [mq[2] as string]: {
            width: "541px",
            height: "413px",
          },
        }}
      />
    </WrapperEmptyDetailActivity>
  );
};

export default memo(EmptyDetailActivity);
