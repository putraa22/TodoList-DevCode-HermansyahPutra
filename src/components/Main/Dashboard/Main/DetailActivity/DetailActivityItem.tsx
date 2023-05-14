import styled from "@emotion/styled";
import React, {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
import { card } from "../../../../../globalStyle/card";
import { ReactComponent as EditButtonSvg } from "../../../../../assets/svg/todo-title-edit-button.svg";
import { ReactComponent as TrashSvg } from "../../../../../assets/svg/tabler_trash.svg";
import { fontStyle } from "../../../../../globalStyle/fonts";
import { mq } from "../../../../../globalStyle/responsive";
import {
  TypeDetailActivity,
  TypeDetailActivityEdited,
  TypePatchDetailActivity,
} from "../../../../../types/DetailActivity/detailActivityType";
import colorPriority from "../../../../../commons/colorPriority";

type TypeDetailActivityItem = Omit<TypeDetailActivity, "activity_group_id"> & {
  patchDetailActivityHandler: (data: TypePatchDetailActivity) => Promise<void>;
  deleteDetailActivityHandler: (data: TypeDetailActivityEdited) => void;
  editDetailActivityHandler: (data: TypeDetailActivityEdited) => void;
};

const Wrapper = styled.div(card, {
  display: "flex",
  padding: "20px",
  justifyContent: "space-between",
  [mq[2] as string]: {
    padding: "30px",
  },
});
const WrapperLeftSide = styled.div({
  display: "flex",
  alignItems: "center",
  columnGap: "14px",
  [mq[2] as string]: {
    columnGap: "22px",
  },
});
const CheckBoxInput = styled.input({
  cursor: "pointer",
  width: "12px",
  height: "12px",
  appearance: "none",
  outline: "1px solid #C7C7C7",
  [mq[2] as string]: {
    width: "20px",
    height: "20px",
  },
  ":checked": {
    appearance: "checkbox",
    background: "#16ABF8",
    outline: "1px solid #16ABF8",
  },
});
const Indicator = styled.span<{ color: string }>(({ color }) => ({
  width: "5px",
  height: "5px",
  background: color,
  borderRadius: "100%",
  [mq[2] as string]: {
    width: "9px",
    height: "9px",
  },
}));
const Title = styled.p<{ isActive: boolean }>(fontStyle, ({ isActive }) => ({
  fontWeight: 500,
  fontSize: "14px",
  [mq[2] as string]: {
    fontSize: "18px",
  },
  color: isActive ? "#888888" : "#111111",
  textDecoration: isActive ? "line-through" : "none",
}));
const WrapperRightSide = styled.div({
  display: "flex",
  alignItems: "center",
});
const RemoveButton = styled.button({
  background: "none",
  border: "none",
  cursor: "pointer",
});
const EditButton = styled.button({
  background: "none",
  border: "none",
  cursor: "pointer",
});
const DetailActivityItem: FC<TypeDetailActivityItem> = ({
  id,
  is_active,
  priority,
  title,
  deleteDetailActivityHandler,
  editDetailActivityHandler,
  patchDetailActivityHandler,
}) => {
  const [isActive, setIsActive] = useState<boolean>(Boolean(!is_active));
  const colorMemo = useMemo(() => {
    return colorPriority(priority);
  }, [priority]);
  const onChangeIsActivie = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const active = event.target.checked;
      setIsActive(() => active);
      await patchDetailActivityHandler({ id, isActive: !active });
    },
    [patchDetailActivityHandler, id],
  );
  return (
    <Wrapper data-cy="todo-item">
      <WrapperLeftSide>
        <CheckBoxInput
          data-cy="todo-item-checkbox"
          type="checkbox"
          checked={isActive}
          onChange={onChangeIsActivie}
        />
        <Indicator data-cy="todo-item-priority-indicator" color={colorMemo} />
        <Title data-cy="todo-item-title" isActive={isActive}>
          {title}
        </Title>
        <EditButton
          data-cy="todo-item-edit-button"
          type="button"
          onClick={() => editDetailActivityHandler({ id, title, priority })}
        >
          <EditButtonSvg
            css={{
              cursor: "pointer",
              width: "12px",
              height: "12px",
              [mq[2] as string]: {
                width: "20px",
                height: "20px",
              },
            }}
          />
        </EditButton>
      </WrapperLeftSide>
      <WrapperRightSide>
        <RemoveButton
          data-cy="todo-item-delete-button"
          type="button"
          onClick={() => deleteDetailActivityHandler({ id, title, priority })}
        >
          <TrashSvg
            css={{
              cursor: "pointer",
              width: "16px",
              height: "16px",
              [mq[2] as string]: {
                width: "24px",
                height: "24px",
              },
            }}
          />
        </RemoveButton>
      </WrapperRightSide>
    </Wrapper>
  );
};

export default memo(DetailActivityItem);
