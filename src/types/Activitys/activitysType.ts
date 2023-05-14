/* eslint-disable import/no-cycle */
import { TypeDetailActivity } from "../DetailActivity/detailActivityType";

export type TypeActivity = {
  id: number;
  title: string;
  created_at: string;
};

export type TypeActivitys = Array<TypeActivity>;

export type TypeActivitysResponseAPI = {
  data: TypeActivitys;
};
export type TypeActivityResponseAPI = TypeActivity & {
  todo_items: Array<TypeDetailActivity>;
};
export type TypePatchActivity = Omit<TypeActivity, "created_at">;
// activity context
export type TypeActivityContext = {
  activitys: TypeActivitys;
  addActivity: () => Promise<void>;
  deleteActivity: (id: number) => Promise<void>;
};
// activity page componenet
export type TypeSelectActivityItem = Omit<TypeActivity, "created_at">;
