import React from "react";
import styled from "styled-components";
import useBookmarkForm, { BookmarkStatus } from "./useBookmarkForm";
import { Bookmark } from "Bookmarks/BookmarksApi";
import useLocation from "hooks/useLocation";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonButton,
  IonFooter,
  IonCard,
} from "@ionic/react";
import useCollections from "Collections/useCollections";
import CollectionPicker from "Collections/CollectionPicker";
import useNavigation from "navigation/useNavigation";

let fallBackImage = "/images/fallback.png";
export default function BookmarkForm({ bookmark: initialBookmark }: BookmarkFormProps) {
  let { bookmark, status, update, save } = useBookmarkForm(initialBookmark);
  let { navigate } = useNavigation();
  let handleSave = async function() {
    await save();
    navigate("/collections");
  };

  return (
    <StyledContainer>
      <StyledForm>
        <IonItem>
          <IonLabel position="floating">Url</IonLabel>
          <StyledTextArea
            className="monospace"
            placeholder="Bookmark url..."
            rows={4}
            name="url"
            value={bookmark.url}
            onIonBlur={(event: any) => update("url", event.target.value)}
          ></StyledTextArea>
        </IonItem>
        <StyledPicker>
          {/* <IonLabel position="floating">Category</IonLabel> */}
          <CollectionPicker
            value={bookmark.collectionKey}
            onChange={(val) => update("collectionKey", val)}
          />
        </StyledPicker>
        <IonItem>
          <IonLabel position="floating">Title</IonLabel>
          <StyledTextArea
            className="title"
            name="title"
            placeholder="Bookmark title..."
            required={true}
            value={bookmark.title}
            onIonChange={(event: any) => update("title", event.target.value)}
          ></StyledTextArea>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Description</IonLabel>
          <StyledTextArea
            name="description"
            placeholder="Bookmark description..."
            required={true}
            rows={6}
            value={bookmark.description}
            onIonChange={(event: any) => update("description", event.target.value)}
          ></StyledTextArea>
        </IonItem>

        <StyledImageContainer className="centered">
          <img src={bookmark.image || fallBackImage} />
        </StyledImageContainer>
        <IonItem>
          <IonLabel position="floating">Image</IonLabel>
          <StyledTextArea
            className="monospace"
            placeholder="Image url..."
            rows={4}
            name="image"
            value={bookmark.image}
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
            disabled={status !== BookmarkStatus.Valid}
            onClick={handleSave}
          >
            Save
          </IonButton>
        </IonItem>
      </StyledForm>
    </StyledContainer>
  );
}

export interface BookmarkFormProps {
  bookmark?: Bookmark;
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

const StyledContainer = styled.div`
  padding-bottom: 80px;

  .monospace {
    font-family: var(--monospace);
    word-wrap: break-word;
  }
`;

const StyledImageContainer = styled.div`
  margin: 16px 16px 0 16px;
  img {
    max-width: 100%;
  }
`;
