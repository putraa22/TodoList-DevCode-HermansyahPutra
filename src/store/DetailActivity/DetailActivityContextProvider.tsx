import React, {
  FC,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { TypePatchActivity } from "../../types/Activitys/activitysType";
import {
  TypeAddDetailActivityItem,
  TypeDetailActivity,
  TypeDetailActivityContext,
  TypeDetailActivityEdited,
  TypeDetailActivityResponseAPI,
  TypeDetailActivitys,
  TypePatchDetailActivity,
} from "../../types/DetailActivity/detailActivityType";
import DetailActivityContext from "./detailActivityContext";

const DetailActivityContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { id } = useParams();
  const [detailActivitys, setDetailActivitys] = useState<TypeDetailActivitys>(
    [],
  );
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isPost, setIsPost] = useState<boolean>(false);
  const getDetailActivitys = useCallback(async () => {
    const response = await fetch(
      `https://todo.api.devcode.gethired.id/activity-groups/${id}`,
    );
    const responseJson: TypeDetailActivityResponseAPI = await response.json();
    setDetailActivitys(() => responseJson.todo_items);
  }, [id]);
  useEffect(() => {
    (async () => getDetailActivitys())();
  }, [isPost, id, isDelete, getDetailActivitys]);
  const patchActivity = useCallback(async (data: TypePatchActivity) => {
    await fetch(
      `https://todo.api.devcode.gethired.id/activity-groups/${data.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
        }),
      },
    );
  }, []);
  const addDetailActivity = useCallback(
    async (data: TypeAddDetailActivityItem) => {
      const detailActivity: Omit<TypeDetailActivity, "id"> = {
        activity_group_id: data.activity_group_id,
        priority: data.priority ? data.priority : "very-high",
        title: data.title,
        is_active: 1,
      };
      await fetch("https://todo.api.devcode.gethired.id/todo-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(detailActivity),
      });
      setIsPost((prev) => !prev);
    },
    [],
  );
  const deleteDetailActivity = useCallback(async (idDetailActivity: number) => {
    await fetch(
      `https://todo.api.devcode.gethired.id/todo-items/${idDetailActivity}`,
      {
        method: "DELETE",
      },
    );
    setIsDelete((prev) => !prev);
  }, []);
  const editDetailActivity = useCallback(
    async (data: TypeDetailActivityEdited) => {
      const editedData: Omit<TypeDetailActivityEdited, "id"> = {
        priority: data.priority,
        title: data.title,
      };
      await fetch(
        `https://todo.api.devcode.gethired.id/todo-items/${data.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedData),
        },
      );
      setIsPost((prev) => !prev);
    },
    [],
  );
  const patchDetailActivity = useCallback(
    async (data: TypePatchDetailActivity) => {
      await fetch(
        `https://todo.api.devcode.gethired.id/todo-items/${data.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_active: data.isActive,
          }),
        },
      );
      setIsPost((prev) => !prev);
    },
    [],
  );
  const detailActivitysMemo = useMemo(() => detailActivitys, [detailActivitys]);
  const detailActivityContextValue: TypeDetailActivityContext = useMemo(
    () => ({
      detailActivitys: detailActivitysMemo,
      patchActivity,
      addDetailActivity,
      editDetailActivity,
      deleteDetailActivity,
      patchDetailActivity,
    }),
    [
      detailActivitysMemo,
      addDetailActivity,
      patchActivity,
      editDetailActivity,
      deleteDetailActivity,
      patchDetailActivity,
    ],
  );
  return (
    <DetailActivityContext.Provider value={detailActivityContextValue}>
      {children}
    </DetailActivityContext.Provider>
  );
};

export default memo(DetailActivityContextProvider);
