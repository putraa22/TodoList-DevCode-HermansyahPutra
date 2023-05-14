import styled from "@emotion/styled";
import React, { FC, memo, useCallback, useMemo, useState } from "react";
import { dataPriority } from "./dataPriorty";
import { ReactComponent as ChevronDownSvg } from "../../assets/svg/tabler_chevron-down.svg";
import { ReactComponent as ChevronUpSvg } from "../../assets/svg/tabler_chevron-up.svg";
import { ReactComponent as CheckSvg } from "../../assets/svg/tabler_check.svg";
import { fontStyle } from "../../globalStyle/fonts";
import { mq } from "../../globalStyle/responsive";

type TypeItemPriority = {
  color: string;
  title: string;
  index: number;
  selectedItem: number;
  getItemIndex: (index: number) => void;
};
type TypePriority = {
  onChange: (priority: string) => void;
  priorityEdited: string | undefined;
};
const WrapperPriority = styled.button({
  padding: "14px",
  borderRadius: "6px",
  position: "relative",
  height: "52px",
  border: "1px solid #E5E5E5",
  background: "#F4F4F4",
  [mq[1] as string]: {
    width: "205px",
  },
});
const SelectItem = styled.div({
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const TitleDefaultItem = styled.p(fontStyle, {
  fontSize: "14px",
  fontWeight: 400,
  color: "#111111",
  [mq[2] as string]: {
    fontSize: "16px",
  },
});
const ContainerList = styled.div({
  borderTop: "1px solid #E5E5E5",
  borderLeft: "1px solid #E5E5E5",
  borderRight: "1px solid #E5E5E5",
  background: "#FFFFFF",
  position: "absolute",
  width: "278px",
  top: "2.8rem",
  left: "-1px",
  zIndex: 2,
  [mq[1] as string]: {
    width: "205px",
  },
});
const WrapperItem = styled.div({
  cursor: "pointer",
  padding: "14px",
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid #E5E5E5",
  ":hover": {
    background: "#16ABF8",
  },
});
const WrapperLeftSide = styled.div({
  display: "flex",
  columnGap: "19px",
  alignItems: "center",
});
const Indicator = styled.div<{ indicatorColor: string }>(
  ({ indicatorColor }) => ({
    width: "14px",
    height: "14px",
    borderRadius: "100%",
    background: indicatorColor,
  }),
);
const TitleItem = styled.p(fontStyle, {
  fontWeight: 400,
  fontSize: "14px",
  color: "#4A4A4A",
  [mq[2] as string]: {
    fontSize: "16px",
  },
});
const WrapperRightSide = styled.div({});
const ItemPriority: FC<TypeItemPriority> = ({
  getItemIndex,
  color,
  title,
  index,
  selectedItem,
}) => {
  const onHandlerPriority = useCallback(
    () => getItemIndex(index),
    [index, getItemIndex],
  );
  return (
    <WrapperItem data-cy="modal-add-priority-item" onClick={onHandlerPriority}>
      <WrapperLeftSide>
        <Indicator indicatorColor={color} />
        <TitleItem>{title}</TitleItem>
      </WrapperLeftSide>
      <WrapperRightSide>
        {selectedItem === index && <CheckSvg />}
      </WrapperRightSide>
    </WrapperItem>
  );
};
const Priority: FC<TypePriority> = ({ onChange, priorityEdited }) => {
  const priorityIndex = useMemo(() => {
    return dataPriority.findIndex(
      ({ priority }) => priority === priorityEdited,
    );
  }, [priorityEdited]);
  const [klick, setKlick] = useState<boolean>(false);
  const [itemIndex, setItemIndex] = useState<number | undefined>(priorityIndex);
  const onHandlerItemIndex = useCallback(
    (index: number) => {
      setItemIndex(() => index);
      onChange(dataPriority[index].priority);
    },
    [onChange],
  );
  return (
    <WrapperPriority
      data-cy="modal-add-priority-dropdown"
      type="button"
      onClick={() => {
        setKlick(!klick);
      }}
    >
      <SelectItem>
        {typeof itemIndex === "undefined" || itemIndex === -1 ? (
          <TitleDefaultItem data-cy="modal-add-priority-item">
            Pilih Priority
          </TitleDefaultItem>
        ) : (
          <WrapperLeftSide data-cy="modal-add-priority-item">
            <Indicator indicatorColor={dataPriority[itemIndex].color} />
            <TitleItem>{dataPriority[itemIndex].title}</TitleItem>
          </WrapperLeftSide>
        )}
        {klick ? <ChevronUpSvg /> : <ChevronDownSvg />}
      </SelectItem>
      {klick && (
        <ContainerList>
          {dataPriority.map(({ color, title }, index) => (
            <ItemPriority
              selectedItem={itemIndex as number}
              getItemIndex={onHandlerItemIndex}
              color={color}
              title={title}
              key={color}
              index={index}
            />
          ))}
        </ContainerList>
      )}
    </WrapperPriority>
  );
};

export default memo(Priority);
