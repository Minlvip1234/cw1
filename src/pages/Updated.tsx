import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { trash } from 'ionicons/icons'
import { deleteRental, updateNewRent, getRentalById, update } from '../databaseHandler';
import { RentHouse } from '../model';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import {
    Camera,
    CameraResultType,
    CameraSource,
    Photo,
} from "@capacitor/camera";
import { people } from 'ionicons/icons'



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
    var [arr, setArr] = useState(arr14)




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
            arr14: arr14
        }
        await update(updateNew)
        window.location.href = 'Update'
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
        setArr(resultFromDB.arr14.reverse())
        setLati(resultFromDB.lati)
        setLong(resultFromDB.long)
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
                    <IonText class="textcre">Update Form</IonText>
                </IonItem>

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
                    <IonText class="textcre">Name</IonText>
                    <IonInput value={name} class="login-text66" onIonChange={e => setName(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Notes</IonText>
                    <IonInput value={notes} class="login-text55" onIonChange={e => setNotes(e.detail.value!)}></IonInput>
                </IonItem>



                <IonItem></IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Optional</IonText>
                </IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Furniture Types</IonText>
                    <IonSelect value={funitureType} class="bre" interface="popover" interfaceOptions={options} onIonChange={e => setFunitureType(e.detail.value!)}>
                        <IonSelectOption value="Furnished" class="brown-option">Furnished</IonSelectOption>
                        <IonSelectOption value="Unfurnished">Unfurnished</IonSelectOption>
                        <IonSelectOption value="Part Furnished">Part Furnished</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Rental condition</IonText>
                    <IonSelect value={optional} class="bre1" interface="popover" interfaceOptions={options} onIonChange={e => setOptional(e.detail.value!)}>
                        <IonSelectOption value="Male only" class="brown-option">Male only</IonSelectOption>
                        <IonSelectOption value="Female only">Female only</IonSelectOption>
                        <IonSelectOption value="No animal">No animal</IonSelectOption>
                        <IonSelectOption value="Full option">Full option</IonSelectOption>
                    </IonSelect>
                </IonItem>


                <IonItem></IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Location</IonText>
                </IonItem>


                <IonItem class="lat" lines="none">
                    <IonText>Latitude: </IonText>
                    <IonInput class="la">{lati}</IonInput>
                </IonItem>
                <IonItem class="lat" lines="none">
                    <IonText>Longitude: </IonText>
                    <IonText class="long">{long}</IonText>
                </IonItem>
                <IonItem></IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">Picture</IonText>
                </IonItem>


                <IonItem class="bui1" lines="none">
                    <IonItem lines="none">
                        <img src={pictureURL} width="160" height="120" />
                    </IonItem>

                    <IonButton class="bui" shape="round" fill="outline" onClick={takePicture}>Select Picture</IonButton>

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

                <IonItem ></IonItem>

                <IonItem lines="none">
                    <IonText class="textcre">All comment here</IonText>
                </IonItem>
                <IonList>
                    {arr.map(c =>
                        <IonItem lines="none" >
                            <IonButton color="light" class="nm1">
                                <IonIcon class="nm" icon={people} size="small" slot="icon-only"></IonIcon>
                            </IonButton>
                            <IonText class="textcre">{c}</IonText>
                        </IonItem>
                    )}
                </IonList>

                <IonItem></IonItem>

            </IonContent>
        </IonPage>

    );
};

export default Updated;
