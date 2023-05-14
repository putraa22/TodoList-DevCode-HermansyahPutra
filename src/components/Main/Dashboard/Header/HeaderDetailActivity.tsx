import styled from "@emotion/styled";
import React, {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackButtonSvg } from "../../../../assets/svg/todo-back-button.svg";
import { ReactComponent as EditButtonSvg } from "../../../../assets/svg/todo-title-edit-button.svg";
import { ReactComponent as SortButtonSvg } from "../../../../assets/svg/todo-sort-button.svg";
import { fontStyle } from "../../../../globalStyle/fonts";
import { mq } from "../../../../globalStyle/responsive";
import AddButton from "../../../UI/AddButton";
import Sort from "../../../Collapse/Sort";
import {
  TypeSelectActivityItem,
  TypePatchActivity,
} from "../../../../types/Activitys/activitysType";
import { TypeSorted } from "../../../../commons/sorter";

type TypeHeaderDetailActivity = {
  sortedType: TypeSorted;
  data: TypeSelectActivityItem;
  addDetailActivityItem: () => void;
  patchActivity: (data: TypePatchActivity) => Promise<void>;
  sortedItemHandler: (select: TypeSorted) => void;
};
const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  [mq[2] as string]: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
const WrapperLeftSide = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
  borderBottom: "1px solid #D8D8D8",
  paddingBottom: "10px",
  [mq[2] as string]: {
    borderBottom: "none",
    paddingBottom: 0,
  },
});
const Title = styled.p(fontStyle, {
  cursor: "pointer",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 600,
  color: "#111111",
  position: "absolute",
  paddingLeft: "32px",
  zIndex: 2,
  [mq[2] as string]: {
    position: "unset",
    paddingLeft: 0,
    zIndex: "unset",
    paddingRight: "19px",
    fontWeight: 700,
    fontSize: "36px",
  },
});
const WrapperRightSide = styled.div({
  position: "relative",
  display: "flex",
  justifyContent: "end",
  marginTop: "24px",
  columnGap: "18px",
  [mq[2] as string]: {
    paddingLeft: 0,
    justifyContent: "space-between",
    marginTop: 0,
    width: "231px",
  },
});
const SortButton = styled.button({
  background: "none",
  border: "none",
  cursor: "pointer",
});
const BackButton = styled.button({
  zIndex: 20,
  background: "none",
  border: "none",
  cursor: "pointer",
});
const EditButton = styled.button({
  background: "none",
  border: "none",
  cursor: "pointer",
});
const InputTitle = styled.input(fontStyle, {
  outline: "none",
  border: "none",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 600,
  color: "#111111",
  background: "none",
  width: "100%",
  ":focus": {
    paddingLeft: "11px",
  },
  [mq[2] as string]: {
    fontWeight: 700,
    fontSize: "36px",
    ":focus": {
      borderBottom: "1px solid #111111",
    },
  },
});
const HeaderDetailActivity: FC<TypeHeaderDetailActivity> = ({
  sortedType,
  data,
  addDetailActivityItem,
  patchActivity,
  sortedItemHandler,
}) => {
  const navigate = useNavigate();
  const dataMemo = useMemo(() => data, [data]);
  const [activityTitle, setActivityTitle] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isSortVisible, setIsSortVisible] = useState<boolean>(false);
  const onChangeTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (isEdit) setActivityTitle(() => event.target.value);
    },
    [isEdit],
  );
  const onBlurInputTitle = useCallback(async () => {
    if (isEdit) setIsEdit(() => false);
    await patchActivity({ title: activityTitle, id: dataMemo.id });
  }, [isEdit, dataMemo.id, activityTitle, patchActivity]);
  const handlerEditOn = useCallback(() => {
    setIsEdit((prev) => !prev);
  }, []);
  const sortIsVisibleHandler = useCallback(
    () => setIsSortVisible((prev) => !prev),
    [],
  );
  useEffect(() => {
    setActivityTitle(() => dataMemo.title);
  }, [dataMemo.title]);
  return (
    <Container>
      <WrapperLeftSide>
        <BackButton
          data-cy="todo-back-button"
          type="button"
          onClick={() => navigate("/")}
        >
          <BackButtonSvg
            css={{
              zIndex: 4,
              cursor: "pointer",
              width: "21px",
              height: "21px",
              [mq[2] as string]: {
                width: "32px",
                height: "31px",
              },
            }}
          />
        </BackButton>
        {!isEdit ? (
          <Title data-cy="todo-title" onClick={handlerEditOn}>
            {activityTitle}
          </Title>
        ) : (
          <InputTitle
            type="text"
            onChange={onChangeTitle}
            value={activityTitle}
            onBlur={onBlurInputTitle}
            autoFocus
          />
        )}
        <EditButton
          data-cy="todo-title-edit-button"
          type="button"
          onClick={handlerEditOn}
        >
          <EditButtonSvg
            css={{
              cursor: "pointer",
              width: "20px",
              height: "20px",
              [mq[2] as string]: {
                width: "24px",
                height: "24px",
              },
            }}
          />
        </EditButton>
      </WrapperLeftSide>
      <WrapperRightSide>
        <SortButton
          data-cy="todo-sort-button"
          type="button"
          onClick={sortIsVisibleHandler}
        >
          <SortButtonSvg
            css={{
              cursor: "pointer",
              width: "38px",
              height: "38px",
              [mq[2] as string]: {
                width: "54px",
                height: "54px",
              },
            }}
          />
        </SortButton>
        {isSortVisible && (
          <Sort
            sortIsVisibleHandler={sortIsVisibleHandler}
            onClick={sortedItemHandler}
            itemSelected={sortedType}
          />
        )}
        <AddButton onClick={addDetailActivityItem} dataCy="todo-add-button" />
      </WrapperRightSide>
    </Container>
  );
};

export default memo(HeaderDetailActivity);
