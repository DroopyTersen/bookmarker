import React, { useEffect } from "react";
import useCollectionForm, { FormStatus } from "./useCollectionForm";
import useNavigation from "navigation/useNavigation";
import styled from "styled-components";
import { IonTextarea, IonItem, IonLabel, IonButton, IonCard } from "@ionic/react";
import BackgroundImage from "components/BackgroundImage/BackgroundImage";
import { useFooterCommands } from "app/Footer";

function CollectionForm({ id = "" }: CollectionFormProps) {
  let { item, save, update, status } = useCollectionForm(id);
  let { navigate } = useNavigation();
  let footerCommands = useFooterCommands();

  let handleSave = async function() {
    let savedItem = await save();
    if (savedItem && savedItem.slug) {
      navigate("/collections");
    }
  };
  useEffect(() => {
    let command = {
      text: "Save",
      onClick: handleSave,
      disabled: status !== FormStatus.Valid,
    };
    footerCommands.set([command]);
  });

  if (status === FormStatus.Loading) {
    return <div>Loading...</div>;
  }
  if (status === FormStatus.Error) {
    return <h1>ERROR!</h1>;
  }

  return (
    <StyledContainer>
      <StyledForm>
        <IonItem>
          <IonLabel position="floating">Title</IonLabel>
          <StyledTextArea
            className="title"
            name="title"
            placeholder="Collection title..."
            required={true}
            value={item.title}
            onIonChange={(event: any) => update("title", event.target.value)}
          ></StyledTextArea>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Sort Order</IonLabel>
          <StyledTextArea
            className="sort-order"
            name="sortOrder"
            type="number"
            required={true}
            value={item.sortOrder ?? 99}
            onIonChange={(event: any) => update("sortOrder", event.target.value)}
          ></StyledTextArea>
        </IonItem>

        <BackgroundImage src={item.image} style={{ height: "300px" }} />
        <IonItem>
          <IonLabel position="floating">Image</IonLabel>
          <StyledTextArea
            className="monospace"
            placeholder="Image url..."
            rows={4}
            name="image"
            value={item.image}
            onIonChange={(event: any) => update("image", event.target.value)}
          ></StyledTextArea>
        </IonItem>
        <IonItem>
          <IonButton
            size="default"
            expand="block"
            color="primary"
            fill="outline"
            style={{ margin: "0 auto" }}
            disabled={status !== FormStatus.Valid}
            onClick={handleSave}
          >
            Save
          </IonButton>
        </IonItem>
      </StyledForm>

      {/* <StyledActions>
      </StyledActions> */}
    </StyledContainer>
  );
}

export default React.memo(CollectionForm);

export interface CollectionFormProps {
  //props
  id?: string;
}

const StyledForm = styled(IonCard)`
  --ion-background-color: var(--white);
  --ion-text-color: var(--black);
  background: var(--white);
`;

const StyledPicker = styled.div`
  position: relative;
  padding: 15px 16px 5px;
`;

const StyledTextArea = styled(IonTextarea)`
  font-size: 14px;
  &.title {
    font-size: 20px;
  }
`;

const StyledActions = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: var(--white);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  padding: 6px 12px;
  z-index: 3;
  ion-button {
    width: 100%;
  }
`;

const StyledContainer = styled.div``;
