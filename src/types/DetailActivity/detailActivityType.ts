/* eslint-disable import/no-cycle */
import { TypePatchActivity } from "../Activitys/activitysType";

export type TypeDetailActivity = {
  activity_group_id: number;
  id: number;
  is_active: number;
  priority: string;
  title: string;
};
export type TypeDetailActivityEdited = {
  id: number;
  priority: string;
  title: string;
};
export type TypeDetailActivitys = Array<TypeDetailActivity>;
export type TypeDetailActivityResponseAPI = {
  todo_items: TypeDetailActivitys;
};
// detail activity form
export type TypeAddDetailActivityItem = {
  activity_group_id: number;
  priority: string;
  title: string;
};
export type TypePatchDetailActivity = {
  id: number;
  isActive: boolean;
};
// detail activity context
export type TypeDetailActivityContext = {
  detailActivitys: TypeDetailActivitys;
  patchActivity: (data: TypePatchActivity) => Promise<void>;
  addDetailActivity: (data: TypeAddDetailActivityItem) => Promise<void>;
  editDetailActivity: (data: TypeDetailActivityEdited) => Promise<void>;
  deleteDetailActivity: (idDetailActivity: number) => Promise<void>;
  patchDetailActivity: (data: TypePatchDetailActivity) => Promise<void>;
};
