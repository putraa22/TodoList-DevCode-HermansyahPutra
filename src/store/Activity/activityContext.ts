import { createContext } from "react";
import { TypeActivityContext } from "../../types/Activitys/activitysType";

const ActivityContext = createContext<TypeActivityContext>(
  {} as TypeActivityContext,
);

export default ActivityContext;
