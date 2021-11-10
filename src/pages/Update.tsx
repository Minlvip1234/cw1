import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { search , reorderFour, build, helpCircle } from 'ionicons/icons'
import { deleteRental, getAllRental, getRentalById } from '../databaseHandler';
import { RentHouse } from '../model';
import { useEffect, useState } from 'react';
import { RefresherEventDetail } from '@ionic/core';
import { useHistory, useParams } from 'react-router';

const Update: React.FC = () => {

    const [searchText, setSearchText] = useState('');
    const [allRental, setAllRental] = useState<RentHouse[]>([]);
    async function fetchData() {
        const resultFromDB = await getAllRental();
        setAllRental(resultFromDB);
    }

    async function searchh() {
        var result = await getAllRental() as RentHouse[]
        if (searchText.trim().length > 0) {
            setAllRental(result.filter(p => p.propertytype.toLowerCase().includes(searchText.toLowerCase())))
        }
        else {
            setAllRental(result)
        }
    }


    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        fetchData();
        setTimeout(() => {
            event.detail.complete();
        }, 1500);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <IonPage >
            <IonContent fullscreen >
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="home" />
                        </IonButtons>
                        <IonText class="head">
                            Update
                        </IonText>
                        <IonButton slot ="end" onClick={searchh} ><IonIcon icon={search} ></IonIcon></IonButton>
                    </IonToolbar>
                </IonHeader>


        
                <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} showCancelButton="focus"></IonSearchbar>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent>
                    </IonRefresherContent>
                </IonRefresher>
               
                    <IonList>
                        {allRental.map(c =>
                            <IonItem routerLink={'/Updated/' + c.id} button key={c.id}>{c.propertytype}</IonItem>
                        )}
                    </IonList>
               

            </IonContent>
        </IonPage>

    );
};

export default Update;
