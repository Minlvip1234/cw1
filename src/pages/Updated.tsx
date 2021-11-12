import { IonAvatar, IonBackButton, IonBadge, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
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
import { toast } from '../toast';



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
    var names = name.split(' ')
    var names1 = names[names.length - 1]
    var [arrayName3, setAllRental2] = useState(false)
    var [arrayName, setAllRental] = useState(false)
  var [arrayName1, setAllRental1] = useState(false)
  var [arrayName2, setAllRental2] = useState(false)





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
        var newarr = name.replace(/ /g, '.').split("");
        var prop = propertytype.replace(/ /g, '.').split("");
        var bed = bedsroom.replace(/ /g, '.').split("");
        var pri = moneyRentPrice.replace(/ /g, '.').split("");

        pri.forEach(element => {
            if (isNaN(parseInt(element)) == true) {
              arrayName3 = true
              return arrayName3
            }
          });
          newarr.forEach(element => {
            if (isNaN(parseInt(element)) == false) {
              arrayName = true
              return arrayName
            }
          });
      
          prop.forEach(element => {
            if (isNaN(parseInt(element)) == false) {
              arrayName1 = true
              return arrayName1
            }
          });
      
          bed.forEach(element => {
            if (isNaN(parseInt(element)) == false) {
              arrayName2 = true
              return arrayName2
            }
          });


         if (arrayName3 == true) {
            navigator.vibrate(1000)
            return toast("Price must be a numbers, please try again")
          }
          else if (arrayName == true) {
            arrayName = false
            navigator.vibrate(1000)
            return toast("Name must not have any number, please try again!")
          }
      
          else if (arrayName1 == true) {
            arrayName1 = false
            navigator.vibrate(1000)
            return toast("Property must not have any number, please try again!")
          }
      
          else if (arrayName2 == true) {
            arrayName2 = false
            navigator.vibrate(1000)
            return toast("Bedroom must not have any number, please try again!")
          }
          else{

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
        window.location.href = 'Update'}
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
                        <IonText>{names1 + `'s ` + propertytype}</IonText>

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
                    <IonBadge slot="end" class="mo">{arr.length}</IonBadge>
                </IonItem>
                <IonList>
                    {arr.map(c =>
                        <IonItem lines="none" >
                            <IonAvatar class="avatar">
                                <IonIcon icon={people}></IonIcon>
                            </IonAvatar>
                            <IonLabel class="hi">{c}</IonLabel>
                        </IonItem>
                    )}
                </IonList>

                <IonItem></IonItem>

            </IonContent>
        </IonPage>

    );
};

export default Updated;
