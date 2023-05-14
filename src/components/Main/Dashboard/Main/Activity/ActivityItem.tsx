import styled from "@emotion/styled";
import React, { FC, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as TrashSvg } from "../../../../../assets/svg/tabler_trash.svg";
import dateFormater from "../../../../../commons/dateFormater";
import { card } from "../../../../../globalStyle/card";
import { fontStyle } from "../../../../../globalStyle/fonts";
import { mq } from "../../../../../globalStyle/responsive";
import {
  TypeActivity,
  TypeSelectActivityItem,
} from "../../../../../types/Activitys/activitysType";

type TypeActivityItem = TypeActivity & {
  onClick: (data: TypeSelectActivityItem) => void;
};
const CardActivity = styled.div(card, {
  display: "flex",
  flexDirection: "column",
  padding: "13px 17px",
  [mq[2] as string]: {
    padding: "25px",
  },
});
const Header = styled(Link)(fontStyle, {
  textDecoration: "none",
  cursor: "pointer",
  flex: 1,
  overflow: "hidden",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  display: "-webkit-box",
  fontSize: "14px",
  fontWeight: 700,
  color: "#111111",
  [mq[2] as string]: {
    WebkitLineClamp: 6,
    fontWeight: 700,
    fontSize: "18px",
  },
});
const Body = styled.div({
  display: "flex",
  justifyContent: "space-between",
});
const DateDescription = styled.p(fontStyle, {
  color: "#888888",
  fontWeight: 500,
  fontSize: "10px",
  [mq[2] as string]: {
    fontSize: "14px",
  },
});
const RemoveButton = styled.button({
  background: "none",
  border: "none",
  cursor: "pointer",
});

const ActivityItem: FC<TypeActivityItem> = ({
  created_at,
  id,
  title,
  onClick,
}) => {
  const dateID = dateFormater(created_at);
  const activity: TypeSelectActivityItem = useMemo(
    () => ({ id, title }),
    [id, title],
  );
  return (
    <CardActivity>
      <Header data-cy="activity-item" to={`detail/${id}`} state={activity}>
        <p data-cy="activity-item-title"> {title}</p>
      </Header>
      <Body>
        <DateDescription data-cy="activity-item-date">{dateID}</DateDescription>
        <RemoveButton
          data-cy="activity-item-delete-button"
          onClick={() => {
            onClick({ id, title });
          }}
        >
          <TrashSvg
            css={{
              width: "12px",
              height: "12px",
              [mq[2] as string]: {
                width: "24px",
                height: "24px",
              },
            }}
          />
        </RemoveButton>
      </Body>
    </CardActivity>
  );
};

export default memo(ActivityItem);
