import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonPage, IonText, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getRentalById, updateNewRent } from '../databaseHandler';
import { RentHouse } from '../model';
import './Views.css';



const Views: React.FC = () => {
    const [propertytype, setPropertytype] = useState('')
    const [bedsroom, setBedsroom] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString())
    const [moneyRentPrice, setMoneyRentPrice] = useState('')
    const [funitureType, setFunitureType] = useState('')
    const [notes, setNotes] = useState('')
    const [name, setName] = useState('')
    const [note2, setNote2] = useState('')
    const [present] = useIonAlert();
    const [pictureURL, setPictureURL] = useState('assets/placeholder.jpg');
    const [optional, setOptional] = useState('')


    interface IdParam {
        id: string
    }
    const { id } = useParams<IdParam>()

    async function updateHandle() {
        const response = await fetch(pictureURL)
        const fileContent = await response.blob()
        const updateNew = {
            id: Number.parseInt(id),
            propertytype: propertytype,
            bedsroom: bedsroom,
            dateOfBirth: dateOfBirth,
            moneyRentPrice: moneyRentPrice,
            funitureType: funitureType,
            notes: notes,
            name: name,
            note2: note2,
            picBlob: fileContent,
            optional:optional
        }
        await updateNewRent(updateNew)
    }

    async function fetchData() {
        const resultFromDB = await getRentalById(Number.parseInt(id)) as RentHouse;
        setName(resultFromDB.name);
        setBedsroom(resultFromDB.bedsroom);
        setDateOfBirth(resultFromDB.dateOfBirth)
        setMoneyRentPrice(resultFromDB.moneyRentPrice)
        setNotes(resultFromDB.notes)
        setPropertytype(resultFromDB.propertytype)
        setNote2(resultFromDB.note2)
        setPictureURL(URL.createObjectURL(resultFromDB.picBlob))
        setOptional(resultFromDB.optional)
        setFunitureType(resultFromDB.funitureType)
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
                    </IonToolbar>
                </IonHeader>

                <IonItem lines="none">
                    <IonText class="textcre">Property Type</IonText>
                    <IonInput disabled class="login-text11" value={propertytype} onIonChange={e => setPropertytype(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Bedsroom</IonText>
                    <IonInput disabled class="login-text22" value={bedsroom} onIonChange={e => setBedsroom(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Date of Birth</IonText>
                    <IonDatetime disabled class="textdate1" value={dateOfBirth}
                        onIonChange={e => setDateOfBirth(e.detail.value!)}></IonDatetime>
                </IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Price per month</IonText>
                    <IonInput disabled value={moneyRentPrice} class="login-text33" onIonChange={e => setMoneyRentPrice(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Funiture type</IonText>
                    <IonInput disabled value={funitureType} class="login-text44" onIonChange={e => setFunitureType(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Notes</IonText>
                    <IonInput disabled value={notes} class="login-text55" onIonChange={e => setNotes(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Name</IonText>
                    <IonInput disabled value={name} class="login-text66" onIonChange={e => setName(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem lines = "none">
                    <IonText class="textcre">Picture</IonText>
                    <IonItem class ="pic">
                        <img src={pictureURL} width="160" height="120" />
                    </IonItem>
                </IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Rental condition</IonText>
                    <IonInput disabled value={optional} class="login-text77" onIonChange={e => setOptional(e.detail.value!)}></IonInput>
                </IonItem>


                <IonItem></IonItem>

                <IonItem lines = "none">
                    <IonText class="textcre">This is comment for viewer</IonText>
                </IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Comment</IonText>
                    <IonInput placeholder="Comment here" class="ll" onIonChange={e => setNote2(e.detail.value!)}></IonInput>
                </IonItem>



                <IonItem lines="none">
                    <IonButton
                        class="buttonnon"
                        shape="round"
                        fill="outline"
                        slot="end"

                        onClick={() =>
                            present({
                                cssClass: 'alertCss',
                                header: 'Warning',
                                message: 'Do you want to Comment this form',
                                buttons: [
                                    'No',
                                    { text: 'Yes', handler: (d) => updateHandle() },
                                ],
                                onDidDismiss: (e) => console.log('cancel'),
                            })
                        }
                    >
                        Up</IonButton>
                </IonItem>



                <IonItem></IonItem>


            </IonContent>
        </IonPage>

    );
};

export default Views;
