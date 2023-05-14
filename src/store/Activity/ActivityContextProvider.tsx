import React, {
  FC,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useMemo,
  memo,
} from "react";

import {
  TypeActivityContext,
  TypeActivitys,
  TypeActivitysResponseAPI,
} from "../../types/Activitys/activitysType";
import ActivtyContext from "./activityContext";

const ActivityContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [activitys, setActivits] = useState<TypeActivitys>([]);
  const [isPost, setIsPost] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const getActivitys = useCallback(async () => {
    const response = await fetch(
      "https://todo.api.devcode.gethired.id/activity-groups/?email=test@email.com",
    );
    const responseJson: TypeActivitysResponseAPI = await response.json();
    setActivits(() => responseJson.data);
  }, []);
  useEffect(() => {
    (async () => getActivitys())();
  }, [getActivitys, isPost, isDelete]);

  const addActivity = useCallback(async () => {
    await fetch("https://todo.api.devcode.gethired.id/activity-groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "New Activity",
        email: "test@email.com",
      }),
    });
    setIsPost((prev) => !prev);
  }, []);
  const deleteActivity = useCallback(async (id: number) => {
    await fetch(`https://todo.api.devcode.gethired.id/activity-groups/${id}`, {
      method: "DELETE",
    });
    setIsDelete((prev) => !prev);
  }, []);
  const activitysMemo = useMemo(() => activitys, [activitys]);
  const activityContextValue: TypeActivityContext = useMemo(
    () => ({
      activitys: activitysMemo,
      addActivity,
      deleteActivity,
    }),
    [activitysMemo, addActivity, deleteActivity],
  );
  return (
    <ActivtyContext.Provider value={activityContextValue}>
      {children}
    </ActivtyContext.Provider>
  );
};

export default memo(ActivityContextProvider);
