export type TypePriority = {
  color: string;
  priority: string;
};

const colorPriority = (priorityItem: string) => {
  const dataPriority: Array<TypePriority> = [
    {
      color: "#ED4C5C",
      priority: "very-high",
    },
    {
      color: "#F8A541",
      priority: "high",
    },
    {
      color: "#00A790",
      priority: "normal",
    },
    {
      color: "#428BC1",
      priority: "low",
    },
    {
      color: "#8942C1",
      priority: "very-low",
    },
  ];
  const { color } = dataPriority.find(
    ({ priority }) => priorityItem === priority,
  ) as TypePriority;
  return color;
};

export default colorPriority;
