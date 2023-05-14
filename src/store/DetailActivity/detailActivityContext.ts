import { createContext } from "react";
import { TypeDetailActivityContext } from "../../types/DetailActivity/detailActivityType";

const DetailActivityContext = createContext<TypeDetailActivityContext>(
  {} as TypeDetailActivityContext,
);

export default DetailActivityContext;
