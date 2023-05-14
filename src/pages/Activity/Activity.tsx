import styled from "@emotion/styled";
import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import ConfirmAlert from "../../components/Alert/ConfirmAlert";
import InformAlert from "../../components/Alert/InformAlert";
import HeaderActivity from "../../components/Main/Dashboard/Header/HeaderActivity";
import ActivityItem from "../../components/Main/Dashboard/Main/Activity/ActivityItem";
import EmptyActivity from "../../components/Main/Dashboard/Main/Activity/EmptyActivity";
import Modal from "../../components/Modal/Modal";
import { mq } from "../../globalStyle/responsive";
import ActivityContext from "../../store/Activity/activityContext";
import ModalContext from "../../store/Modal/modalContext";
import { TypeSelectActivityItem } from "../../types/Activitys/activitysType";

const Activitys = styled.div({
  display: "grid",
  paddingTop: "37px",
  gridAutoRows: "150px",
  columnGap: "20px",
  rowGap: "20px",
  gridTemplateColumns: "repeat(2, 150px)",
  [mq[0] as string]: {
    gridTemplateColumns: "repeat(3, 150px)",
  },
  [mq[1] as string]: {
    gridTemplateColumns: "repeat(4, 150px)",
  },
  [mq[2] as string]: {
    gridTemplateColumns: "repeat(3, 235px)",
    gridAutoRows: "234px",
    paddingTop: "49px",
    rowGap: "26px",
  },
  [mq[3] as string]: {
    gridTemplateColumns: "repeat(4, 235px)",
  },
});

const Activity = () => {
  const { activitys, addActivity, deleteActivity } =
    useContext(ActivityContext);
  const activitysMemo = useMemo(() => {
    return activitys;
  }, [activitys]);
  const [selectActivityItem, setSelectActivityItem] =
    useState<TypeSelectActivityItem>({} as TypeSelectActivityItem);
  const {
    setModalOn,
    setModalOff,
    setModalChangeChildrenElementOff,
    setModalChangeChildrenElementOn,
    isModalChangeChildrenElement,
    isModalVisible,
  } = useContext(ModalContext);
  const selectActivityWillDelete = useCallback(
    (data: TypeSelectActivityItem) => {
      setModalOn();
      setSelectActivityItem((prev) => ({ ...prev, ...data }));
      setModalChangeChildrenElementOff();
    },
    [setModalOn, setModalChangeChildrenElementOff],
  );
  const handlerDeleteActivity = useCallback(async () => {
    await deleteActivity(selectActivityItem.id);
    setModalChangeChildrenElementOn();
  }, [setModalChangeChildrenElementOn, selectActivityItem.id, deleteActivity]);
  return (
    <>
      {isModalVisible && (
        <Modal onModalOff={setModalOff}>
          {!isModalChangeChildrenElement ? (
            <ConfirmAlert
              fromItem="Activity"
              itemTitle={selectActivityItem.title}
              onBack={setModalOff}
              onConfirm={handlerDeleteActivity}
            />
          ) : (
            <InformAlert fromItem="Activity" />
          )}
        </Modal>
      )}
      <HeaderActivity onClick={addActivity} />
      {activitysMemo.length === 0 ? (
        <EmptyActivity onClick={addActivity} />
      ) : (
        <Activitys>
          {activitysMemo.map(({ id, created_at, title }) => (
            <ActivityItem
              key={id}
              id={id}
              created_at={created_at}
              title={title}
              onClick={selectActivityWillDelete}
            />
          ))}
        </Activitys>
      )}
    </>
  );
};

export default memo(Activity);
