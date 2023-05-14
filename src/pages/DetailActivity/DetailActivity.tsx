import styled from "@emotion/styled";
import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import sorter, { TypeSorted } from "../../commons/sorter";
import ConfirmAlert from "../../components/Alert/ConfirmAlert";
import InformAlert from "../../components/Alert/InformAlert";
import FormDetailActivity from "../../components/Form/DetailActivity/FormDetailActivity";
import HeaderDetailActivity from "../../components/Main/Dashboard/Header/HeaderDetailActivity";
import DetailActivityItem from "../../components/Main/Dashboard/Main/DetailActivity/DetailActivityItem";
import EmptyDetailActivity from "../../components/Main/Dashboard/Main/DetailActivity/EmptyDetailActivity";
import Modal from "../../components/Modal/Modal";
import { mq } from "../../globalStyle/responsive";
import DetailActivityContext from "../../store/DetailActivity/detailActivityContext";
import ModalContext from "../../store/Modal/modalContext";
import { TypeSelectActivityItem } from "../../types/Activitys/activitysType";
import { TypeDetailActivityEdited } from "../../types/DetailActivity/detailActivityType";

const DetailActivitys = styled.div({
  display: "flex",
  flexDirection: "column",
  paddingTop: "28px",
  rowGap: "10px",
  [mq[2] as string]: {
    paddingTop: "49px",
  },
});

const DetailActivity = () => {
  const { state }: { state: TypeSelectActivityItem } = useLocation();
  const selectedActivityMemo: TypeSelectActivityItem = useMemo(
    () => state,
    [state],
  );
  const {
    patchDetailActivity,
    patchActivity,
    deleteDetailActivity,
    detailActivitys,
  } = useContext(DetailActivityContext);

  const [sortedType, setSortedType] = useState<TypeSorted>("Terbaru");
  const detailActivitysMemo = useMemo(() => {
    return sorter(detailActivitys, sortedType);
  }, [detailActivitys, sortedType]);
  const {
    isModalVisible,
    isModalChangeChildrenElement,
    setModalOff,
    setModalOn,
    setModalChangeChildrenElementOff,
    setModalChangeChildrenElementOn,
  } = useContext(ModalContext);
  const [detailActivityItem, setDetailActivityItem] =
    useState<TypeDetailActivityEdited>({} as TypeDetailActivityEdited);
  const detailActivityItemMemo = useMemo(
    () => detailActivityItem,
    [detailActivityItem],
  );
  const [isAddButtonClicked, setIsAddButtonClicked] = useState<boolean>(false);
  const [isEditButtonClicked, setIsEditButtonClicked] =
    useState<boolean>(false);
  const [isDeleteButtonClicked, setIsDeleteButtonClicked] =
    useState<boolean>(false);
  const sortedItemHandler = useCallback((select: TypeSorted) => {
    setSortedType(() => select);
  }, []);
  const addDetailActivityHandler = useCallback(() => {
    setModalOn();
    setIsAddButtonClicked((prev) => !prev);
  }, [setModalOn]);
  const editDetailActivityHandler = useCallback(
    (data: TypeDetailActivityEdited) => {
      setDetailActivityItem((prev) => ({ ...prev, ...data }));
      setModalOn();
      setIsEditButtonClicked((prev) => !prev);
    },
    [setModalOn],
  );
  const deleteDetailActivityHandler = useCallback(
    (data: TypeDetailActivityEdited) => {
      setModalChangeChildrenElementOff();
      setDetailActivityItem((prev) => ({ ...prev, ...data }));
      setModalOn();
      setIsDeleteButtonClicked((prev) => !prev);
    },
    [setModalOn, setModalChangeChildrenElementOff],
  );
  const delteDetailActvityConfirmHandler = useCallback(async () => {
    if (!isModalChangeChildrenElement) {
      await deleteDetailActivity(detailActivityItemMemo.id);
      setModalChangeChildrenElementOn();
    }
  }, [
    setModalChangeChildrenElementOn,
    deleteDetailActivity,
    detailActivityItemMemo.id,
    isModalChangeChildrenElement,
  ]);
  const modalOffHandler = useCallback(() => {
    if (isAddButtonClicked) setIsAddButtonClicked((prev) => !prev);
    if (isEditButtonClicked) setIsEditButtonClicked((prev) => !prev);
    if (isDeleteButtonClicked) {
      setIsDeleteButtonClicked((prev) => !prev);
      setModalChangeChildrenElementOff();
    }
    setModalOff();
  }, [
    setModalOff,
    setModalChangeChildrenElementOff,
    isAddButtonClicked,
    isEditButtonClicked,
    isDeleteButtonClicked,
  ]);
  return (
    <>
      {isModalVisible && (
        <Modal onModalOff={modalOffHandler}>
          {isAddButtonClicked && (
            <FormDetailActivity
              activityGroupId={selectedActivityMemo.id}
              closeHandler={modalOffHandler}
              formTitle="Tambah List Item"
              formType="add"
            />
          )}
          {isEditButtonClicked && (
            <FormDetailActivity
              closeHandler={modalOffHandler}
              formTitle="Edit List Item"
              formType="edit"
              edited={detailActivityItemMemo}
            />
          )}
          {isDeleteButtonClicked &&
            (!isModalChangeChildrenElement ? (
              <ConfirmAlert
                fromItem="item"
                itemTitle={detailActivityItemMemo.title}
                onBack={modalOffHandler}
                onConfirm={delteDetailActvityConfirmHandler}
              />
            ) : (
              <InformAlert fromItem="item" />
            ))}
        </Modal>
      )}
      <HeaderDetailActivity
        sortedType={sortedType}
        sortedItemHandler={sortedItemHandler}
        data={selectedActivityMemo}
        addDetailActivityItem={addDetailActivityHandler}
        patchActivity={patchActivity}
      />
      <DetailActivitys>
        {detailActivitysMemo.length === 0 ? (
          <EmptyDetailActivity onClick={addDetailActivityHandler} />
        ) : (
          detailActivitysMemo.map(({ id, is_active, priority, title }) => (
            <DetailActivityItem
              patchDetailActivityHandler={patchDetailActivity}
              editDetailActivityHandler={editDetailActivityHandler}
              deleteDetailActivityHandler={deleteDetailActivityHandler}
              key={id}
              id={id}
              is_active={is_active}
              priority={priority}
              title={title}
            />
          ))
        )}
      </DetailActivitys>
    </>
  );
};

export default memo(DetailActivity);
