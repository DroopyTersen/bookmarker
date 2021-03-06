import React, { useCallback } from "react";
import { IonButton, IonIcon, IonBackButton } from "@ionic/react";
import useNavigation from "./useNavigation";
import Icon from "components/primitives/Icon";
function BackButton({ url = "" }: BackButtonProps) {
  let { goBack, navigate } = useNavigation();

  let handleClick = () => {
    if (url === "back") {
      goBack("/");
    } else navigate(url || "/");
  };
  return (
    <IonButton onClick={handleClick}>
      <Icon name="arrow-round-back" slot="icon-only" />
      {/* <i style={{ fontSize: "24px" }} slot="icon-only" className="ion-md-arrow-round-back"></i> */}
      {/* <IonIcon name="arrow-round-back"></IonIcon> */}
    </IonButton>
  );
}

export default React.memo(BackButton);

export interface BackButtonProps {
  url: string;
}
