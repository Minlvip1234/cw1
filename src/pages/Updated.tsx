import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { trash } from 'ionicons/icons'
import { deleteRental, updateNewRent, getRentalById } from '../databaseHandler';
import { RentHouse } from '../model';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import {
    Camera,
    CameraResultType,
    CameraSource,
    Photo,
} from "@capacitor/camera";


const Updated: React.FC = () => {

    const [propertytype, setPropertytype] = useState('')
    const [bedsroom, setBedsroom] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString())
    const [moneyRentPrice, setMoneyRentPrice] = useState('')
    const [funitureType, setFunitureType] = useState('')
    const [notes, setNotes] = useState('')
    const [note2, setNote2] = useState('')
    const [name, setName] = useState('')
    const [present] = useIonAlert();
    const [pictureURL, setPictureURL] = useState('assets/placeholder.jpg');
    const [optional, setOptional] = useState('')
    var [lati, setLati] = useState('')
    var [long, setLong] = useState('')
    let arr14 = Array<string>();




    const options = {
        cssClass: 'my-custom-interface'
    };

    interface IdParam {
        id: string
    }
    const { id } = useParams<IdParam>()

    async function handleDelete() {
        await deleteRental(Number.parseInt(id))
        navigator.vibrate(500);
        window.location.href = 'Update'
    }

    async function takePicture() {
        const cameraPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Prompt,
            quality: 60
        })
        setPictureURL(cameraPhoto.webPath!)
    }

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
            optional: optional,
            lati: lati,
            long: long,
            arr14:arr14
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
        setFunitureType(resultFromDB.funitureType)
        setPropertytype(resultFromDB.propertytype)
        setNote2(resultFromDB.note2)
        setPictureURL(URL.createObjectURL(resultFromDB.picBlob))
        setOptional(resultFromDB.optional)
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
                        <IonButton
                            onClick={() =>
                                present({
                                    cssClass: 'alertCss',
                                    header: 'Warning',
                                    message: 'Do you want to delete it',
                                    buttons: [
                                        'No',
                                        { text: 'Yes', handler: (d) => handleDelete() },
                                    ],
                                })
                            }
                            slot="end" color="light">
                            <IonIcon slot="icon-only" icon={trash}></IonIcon>
                        </IonButton>
                    </IonToolbar>
                </IonHeader>

                <IonItem lines="none">
                    <IonText class="textcre">Property Type</IonText>
                    <IonInput class="login-text11" value={propertytype} onIonChange={e => setPropertytype(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Bedsroom</IonText>
                    <IonInput class="login-text22" value={bedsroom} onIonChange={e => setBedsroom(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Date and Time</IonText>
                    <IonDatetime class="textdate" value={dateOfBirth}
                        onIonChange={e => setDateOfBirth(e.detail.value!)}></IonDatetime>
                </IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Price per month</IonText>
                    <IonInput value={moneyRentPrice} class="login-text33" onIonChange={e => setMoneyRentPrice(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Furniture Types</IonText>
                    <IonSelect value={funitureType} class="textcre" interface="popover" interfaceOptions={options} onIonChange={e => setFunitureType(e.detail.value!)}>
                        <IonSelectOption value="Furnished" class="brown-option">Furnished</IonSelectOption>
                        <IonSelectOption value="Unfurnished">Unfurnished</IonSelectOption>
                        <IonSelectOption value="Part Furnished">Part Furnished</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Rental condition</IonText>
                    <IonSelect value={optional} class="textcre" interface="popover" interfaceOptions={options} onIonChange={e => setOptional(e.detail.value!)}>
                        <IonSelectOption value="Male only" class="brown-option">Male only</IonSelectOption>
                        <IonSelectOption value="Female only">Female only</IonSelectOption>
                        <IonSelectOption value="No animal">No animal</IonSelectOption>
                        <IonSelectOption value="Full option">Full option</IonSelectOption>
                    </IonSelect>
                </IonItem>

                


                <IonItem lines="none">
                    <IonText class="textcre">Notes</IonText>
                    <IonInput value={notes} class="login-text55" onIonChange={e => setNotes(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Name</IonText>
                    <IonInput value={name} class="login-text66" onIonChange={e => setName(e.detail.value!)}></IonInput>
                </IonItem>



                <IonItem class="bui1" lines="none">
                    <IonItem lines="none">
                        <img src={pictureURL} width="160" height="120" />
                    </IonItem>
                    <IonItem lines="none">
                        <IonButton class="bui" shape="round" fill="outline" onClick={takePicture}>Select Picture</IonButton>
                    </IonItem>
                </IonItem>





                <IonItem></IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">See Comment</IonText>
                </IonItem>



                <IonItem lines="none">
                    <IonText class="textcre">Comment</IonText>
                    <IonInput disabled value={note2} class="ll" onIonChange={e => setNote2(e.detail.value!)}></IonInput>
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
                                message: 'Do you want to update it',
                                buttons: [
                                    'No',
                                    { text: 'Yes', handler: (d) => updateHandle() },
                                ],
                            })
                        }
                    >
                        Update</IonButton>
                </IonItem>

            </IonContent>
        </IonPage>

    );
};

export default Updated;
