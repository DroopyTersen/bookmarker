import React, { useState, useEffect } from "react";
import Link from "navigation/Link";
import Grid from "components/Grid/Grid";
import styled from "styled-components";

import BackgroundImage, { StyledOverlay } from "components/BackgroundImage/BackgroundImage";
import { IonButton, IonActionSheet, IonCard } from "@ionic/react";
import Icon from "components/primitives/Icon";
import useNavigation from "navigation/useNavigation";
import { useFooter, useFooterCommands } from "app/Footer";
import { useCollections } from "app/appState";

function CollectionsList({}: CollectionsListProps) {
  let { collections, remove } = useCollections();
  let { navigate } = useNavigation();
  let width = "150px";
  let height = width;
  let [actionSheetKey, setActionSheetKey] = useState("");

  return (
    <>
      <StyledGridContainer>
        <StyledGrid className="collections-list" gap={1}>
          {collections.map((item) => (
            <StyledImage src={item.image} key={item.key} to={"/collections/" + item.slug}>
              <StyledOverlay className="centered title">{item.title}</StyledOverlay>
              <StyledActionButton
                fill="clear"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActionSheetKey(item.key);
                  return false;
                }}
              >
                <Icon name="more" />
              </StyledActionButton>
            </StyledImage>
          ))}
        </StyledGrid>
      </StyledGridContainer>
      <IonButton
        onClick={() => navigate("/collections/new")}
        expand="block"
        fill="outline"
        style={{ margin: "15px 10px" }}
      >
        <Icon name="add" size="14px" />
        New Collection
      </IonButton>
      <IonActionSheet
        header={collections.find((c) => c.key === actionSheetKey)?.title}
        isOpen={!!actionSheetKey}
        onDidDismiss={() => setActionSheetKey("")}
        buttons={[
          {
            text: "Edit Collection",
            // icon: "edit",
            handler: () => {
              navigate("/collections/edit/" + actionSheetKey);
            },
          },
          {
            text: "Delete Collection",
            // icon: "trash",
            role: "destructive",
            handler: () => {
              remove(actionSheetKey);
            },
          },
        ]}
      />
    </>
  );
}

export default React.memo(CollectionsList);

let StyledImage = styled(BackgroundImage)`
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  height: 150px;
  @media only screen and (min-width: 1000px) {
    height: 300px;
  }
  @media only screen and (min-width: 1200px) {
    .title {
      font-size: 38px;
    }
  }
`;
export interface CollectionsListProps {
  //props
}
const StyledGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1px;
  @media only screen and (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const StyledGridContainer = styled(IonCard)`
  background: var(--accent-300);
  --ion-font-family: "Slabo 27px";
`;

const StyledActionButton = styled(IonButton)`
  position: absolute;
  top: 5px;
  right: 5px;
  color: var(--white);
`;
