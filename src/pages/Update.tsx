import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
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
    const [choose, setChoose] = useState('');

    async function fetchData() {
        const resultFromDB = await getAllRental();
        console.log(choose)

        if (searchText.trim().length > 0 && choose == "Pro") {
            setAllRental(resultFromDB.filter(p => p.propertytype.toLowerCase().includes(searchText.toLowerCase())))
        }
        else if (choose == "Pri") {
            setAllRental(resultFromDB.filter(p => p.moneyRentPrice.includes(searchText)))
        }
        else if (choose == "Name") {
            setAllRental(resultFromDB.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase())))
        }
        else {
            setAllRental(resultFromDB);
        }
        
    }

    const options = {
        cssClass: 'my-custom-interface'
    };


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
                       
                    </IonToolbar>
                </IonHeader>
                


        
                <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} showCancelButton="focus"></IonSearchbar>
                <IonItem lines="none">
                    <IonText >Select option</IonText>
                    <IonSelect slot="end" interface="popover" interfaceOptions={options} onIonChange={e => setChoose(e.detail.value!)}>
                        <IonSelectOption value="Pro" class="brown-option">Property Type</IonSelectOption>
                        <IonSelectOption value="Pri">Price</IonSelectOption>
                        <IonSelectOption value="Name">Name</IonSelectOption>
                    </IonSelect>
                </IonItem>
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
