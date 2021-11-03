import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import './Home.css';
import { checkboxOutline, reorderFour, build, helpCircle } from 'ionicons/icons'

const Home: React.FC = () => {
  return (
    <IonPage >
      <IonContent fullscreen class="background" >

        <IonButton routerLink='/CreateForm' color="light" class="createFormBut">
          <IonIcon class="createForm" icon={checkboxOutline} size="large" slot="icon-only"></IonIcon>
        </IonButton>

        <IonButton routerLink='/View' color="light" class="createFormBut1">
          <IonIcon class="createForm" icon={reorderFour} size="large" slot="icon-only"></IonIcon>
        </IonButton>

        <IonButton routerLink='Update' color="light" class="createFormBut2">
          <IonIcon class="createForm" icon={build} size="large" slot="icon-only"></IonIcon>
        </IonButton>

        <IonButton routerLink="/Info" color="light" class="createFormBut3">
          <IonIcon class="createForm" icon={helpCircle} size="large" slot="icon-only"></IonIcon>
        </IonButton>

      </IonContent>
    </IonPage>

  );
};

export default Home;
