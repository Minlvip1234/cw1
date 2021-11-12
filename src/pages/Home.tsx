import {  IonContent, IonFab, IonFabButton, IonFabList, IonIcon,  IonPage } from '@ionic/react';
import './Home.css';
import {  add, people, hammer } from 'ionicons/icons'
import { RouteComponentProps } from 'react-router';


const Home: React.FC  <RouteComponentProps> = (props: RouteComponentProps)=> {
  return (
    <IonPage >
      <IonContent fullscreen class="background" >
      <IonFab horizontal="end" vertical="center" slot="fixed" edge>
          <IonFabButton>
            <IonIcon icon={add}/>
          </IonFabButton>
          <IonFabList>
          <IonFabButton href = "CreateForm">
            <IonIcon icon={people}/>
          </IonFabButton>
          <IonFabButton href = "Update">
            <IonIcon icon={hammer}/>
          </IonFabButton>
          </IonFabList>
        </IonFab>
    
      </IonContent>


    </IonPage>

  );
};

export default Home;
