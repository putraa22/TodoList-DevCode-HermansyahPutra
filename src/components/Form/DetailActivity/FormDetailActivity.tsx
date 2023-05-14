import styled from "@emotion/styled";
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { card } from "../../../globalStyle/card";
import { fontStyle } from "../../../globalStyle/fonts";
import { ReactComponent as CloseSvg } from "../../../assets/svg/modal-add-close-button.svg";
import Priority from "../../Dropdowns/Priority";
import { mq } from "../../../globalStyle/responsive";
import RegularButton from "../../UI/RegularButton";
import DetailActivityContext from "../../../store/DetailActivity/detailActivityContext";
import { TypeFormData } from "../../../types/Form/formType";
import { TypeDetailActivityEdited } from "../../../types/DetailActivity/detailActivityType";

type TypeFormDetailActivity = {
  formTitle: string;
  formType: "add" | "edit";
  closeHandler: () => void;
  activityGroupId?: number;
  edited?: TypeDetailActivityEdited;
};
const Form = styled.form(card, {
  position: "fixed",
  zIndex: 31,
  width: "320px",
  height: "382px",
  display: "flex",
  flexDirection: "column",
  overflow: "scroll",
  [mq[1] as string]: {
    width: "830px",
    height: "403px",
    overflow: "unset",
  },
});
const Header = styled.div({
  display: "flex",
  justifyContent: "space-between",
  padding: "17px 20px",
  alignItems: "center",
});
const CloseButton = styled.button({
  background: "none",
  border: "none",
  cursor: "pointer",
});
const Title = styled.h1(fontStyle, {
  fontWeight: 600,
  fontSize: "16px",
  color: "#111111",
  [mq[2] as string]: {
    fontSize: "18px",
  },
});
const Body = styled.div({
  display: "flex",
  flexDirection: "column",
  height: "232px",
  borderTop: "1px solid #E5E5E5",
  borderBottom: "1px solid #E5E5E5",
  padding: "23px 20px 28px 22px",
  rowGap: "12px",
});
const Label = styled.label(fontStyle, {
  fontWeight: 600,
  fontSize: "10px",
  color: "#111111",
  [mq[2] as string]: {
    fontSize: "12px",
  },
});
const Input = styled.input(fontStyle, {
  fontSize: "14px",
  fontWeight: 400,
  borderRadius: "6px",
  padding: "16px",
  height: "52px",
  border: "1px solid #E5E5E5",
  [mq[2] as string]: {
    fontSize: "16px",
  },
  ":focus": {
    border: "1px solid #16ABF8",
  },
});
const Footer = styled.div({
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "0 27px",
});
const FormDetailActivity: FC<TypeFormDetailActivity> = ({
  formTitle,
  formType,
  activityGroupId,
  edited,
  closeHandler,
}) => {
  const activityGroupIdMemo = useMemo(() => activityGroupId, [activityGroupId]);
  const editedMemo = useMemo(() => edited, [edited]);
  const { addDetailActivity, editDetailActivity } = useContext(
    DetailActivityContext,
  );
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [data, setData] = useState<TypeFormData>({
    title: editedMemo?.title || "",
    priority: editedMemo?.priority || "",
  });
  const dataMemo = useMemo(() => data, [data]);
  const priorityValue = useCallback((priority: string) => {
    setData((prev) => ({ ...prev, priority }));
  }, []);
  const disableButton = useCallback((input: string) => {
    const isInput = input.trim().length === 0;
    setIsDisabled(() => isInput);
  }, []);
  const onFocusHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      disableButton(event.target.value);
    },
    [disableButton],
  );
  const onChangeTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      disableButton(event.target.value);
      setData((prev) => ({ ...prev, title: event.target.value }));
    },
    [disableButton],
  );
  const onHandlerSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (formType === "add") {
        await addDetailActivity({
          ...dataMemo,
          activity_group_id: activityGroupIdMemo as number,
        });
      } else {
        await editDetailActivity({ ...dataMemo, id: editedMemo?.id as number });
      }
      closeHandler();
    },
    [
      addDetailActivity,
      editDetailActivity,
      closeHandler,
      dataMemo,
      editedMemo?.id,
      activityGroupIdMemo,
      formType,
    ],
  );

  return (
    <Form data-cy="modal-add" onSubmit={onHandlerSubmit}>
      <Header>
        <Title data-cy="modal-add-title">{formTitle}</Title>
        <CloseButton
          data-cy="modal-add-close-button"
          type="button"
          onClick={closeHandler}
        >
          <CloseSvg />
        </CloseButton>
      </Header>
      <Body>
        <Label data-cy="modal-add-name-title" htmlFor="title">
          Nama ListItem
        </Label>
        <Input
          data-cy="modal-add-name-input"
          onFocus={onFocusHandler}
          autoFocus
          value={dataMemo.title}
          onChange={onChangeTitle}
          type="tex"
          id="title"
          placeholder="Tambahkan nama list item"
        />
        <Label data-cy="modal-add-priority-title" htmlFor="priority">
          Priority
        </Label>
        <Priority priorityEdited={dataMemo.priority} onChange={priorityValue} />
      </Body>
      <Footer>
        <RegularButton
          dataCy="modal-add-save-button"
          type="submit"
          disabled={isDisabled}
          backgroundColor="#16ABF8"
          text="Simpan"
          textColor="white"
        />
      </Footer>
    </Form>
  );
};

export default memo(FormDetailActivity);
