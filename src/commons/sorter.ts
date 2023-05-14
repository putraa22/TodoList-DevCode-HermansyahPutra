import { TypeDetailActivity } from "../types/DetailActivity/detailActivityType";

export type TypeSorted =
  | "Terlama"
  | "A-Z"
  | "Z-A"
  | "Belum Selesai"
  | "Terbaru";

const sorter = (
  value: Array<Omit<TypeDetailActivity, "activity_group_id">>,
  type: TypeSorted,
): Array<Omit<TypeDetailActivity, "activity_group_id">> => {
  if (type === "Terlama") {
    return value.sort((a, b) => Number(a.id) - Number(b.id));
  }
  if (type === "A-Z") {
    return value.sort((a, b) =>
      a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1,
    );
  }
  if (type === "Z-A") {
    return value.sort((a, b) =>
      a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1,
    );
  }
  if (type === "Belum Selesai") {
    return value.sort((a, b) => b.is_active - a.is_active);
  }
  return value.sort((a, b) => Number(b.id) - Number(a.id));
};

export default sorter;
