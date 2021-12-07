import { IonBackButton, IonButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonSelect, IonSelectOption, IonText, IonToolbar } from '@ionic/react';
import { getAllRental } from '../databaseHandler';
import { RentHouse } from '../model';
import { useEffect, useState } from 'react';
import { RefresherEventDetail } from '@ionic/core';


const View: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [choose, setChoose] = useState('');
    const [allRental, setAllRental] = useState<RentHouse[]>([]);
    

    const options = {
        cssClass: 'my-custom-interface'
    };


    async function fetchData() {
        const resultFromDB = await getAllRental();
        setAllRental(resultFromDB);
        
    }

    async function search(searchText: string)
    {
        if (choose === "Pro")
        {
            searchProp(searchText)
        }
        else if(choose === "Pri")
        {
            searchPri(searchText)
        }
        else if(choose === "Name")
        {
            searchNan(searchText)
        }
        else
        {
            searchAll(searchText)
        }
       
        
        
    }

    async function searchProp(searchText: string) {
        const resultFromDB = await getAllRental();
        const bro = resultFromDB.filter(p => p.propertytype.toLowerCase().includes(searchText.toLowerCase()))
        setAllRental(bro);
    }

    async function searchPri(searchText: string) {
        const resultFromDB = await getAllRental();
        const bro = resultFromDB.filter(p => p.monthPrice.toLowerCase().includes(searchText.toLowerCase()))
        setAllRental(bro);
    }

    async function searchNan(searchText: string) {
        const resultFromDB = await getAllRental();
        const bro = resultFromDB.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()))
        setAllRental(bro);
    }

    async function searchAll(searchText: string) {
        const resultFromDB = await getAllRental();
        setAllRental(resultFromDB);
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
                            View
                        </IonText>

                    </IonToolbar>
                </IonHeader>
                <IonItem lines="none">
                    <IonSearchbar onIonChange={e => search(e.detail.value!)} showCancelButton="focus"></IonSearchbar>
                </IonItem>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent>
                    </IonRefresherContent>
                </IonRefresher>

                <IonItem lines="none">
                    <IonText >Select option</IonText>
                    <IonSelect slot="end" interface="popover" interfaceOptions={options} onIonChange={e => setChoose(e.detail.value!)}>
                        <IonSelectOption value="Pro" class="brown-option">Property Type</IonSelectOption>
                        <IonSelectOption value="Pri">Price</IonSelectOption>
                        <IonSelectOption value="Name">Name</IonSelectOption>
                        <IonSelectOption value="All">All Rental</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonList >
                    {allRental.map(c =>
                        <IonCard color="tertiary" routerLink={'/Views/' + c.id} button key={c.id} >
                            <img src={URL.createObjectURL(c.picBlob)} width="350" height="250" />
                            <IonCardHeader>
                                <IonCardSubtitle>Owner: {c.name}</IonCardSubtitle>
                                <IonCardSubtitle>{c.dateOfBirth}</IonCardSubtitle>
                                <IonCardTitle>{c.propertytype}</IonCardTitle>
                                <IonCardTitle>Price: {c.monthPrice + "$"}</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                    )}
                </IonList>
                <IonItem></IonItem>

            </IonContent>
        </IonPage>

    );
};

export default View;
