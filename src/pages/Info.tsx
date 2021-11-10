import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonPage, IonText, IonToolbar } from '@ionic/react';
import './Infor.css';

const Info: React.FC = () => {
    return (
        <IonPage >

            <IonContent fullscreen >
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="home" />
                        </IonButtons>
                        <IonText class="head">
                            Infomation
                        </IonText>
                    </IonToolbar>
                </IonHeader>

                <IonItem class="teet" lines="none">
                    <IonText class="teet1">Made by: Duong Duc Anh</IonText>
                </IonItem>
                <IonItem lines="none">
                    <IonText class="teet1">ID: 001201604</IonText>

                </IonItem>
                <IonItem lines="none">
                    <IonText class="teet1">Name app: Rental Apartments Finder.</IonText>
                </IonItem>
                <IonItem lines="none">

                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default Info;
