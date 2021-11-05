import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonText, IonToolbar, useIonAlert } from '@ionic/react';
import { useState } from 'react';
import './CreateForm.css';
import { getAllRental, insertRental } from '../databaseHandler';
import { toast } from '../toast';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { useHistory } from 'react-router';
import { RentHouse } from '../model';
import ReactAudioPlayer from 'react-audio-player';

const CreateForm: React.FC = () => {
  var myPlayer: ReactAudioPlayer | null
  const [propertytype, setPropertytype] = useState('')
  const [bedsroom, setBedsroom] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString())
  const [moneyRentPrice, setMoneyRentPrice] = useState('')
  const [funitureType, setFunitureType] = useState('')
  const [notes, setNotes] = useState('')
  const [name, setName] = useState('')
  const [optional, setOptional] = useState('')
  const [present] = useIonAlert();
  const [pictureURL, setPictureURL] = useState('assets/placeholder.jpg');
  const [note2, setNote2] = useState('')
  var [array, setAllRental] = useState(false)
  var [arrayName, setAllRental] = useState(false)
  var [arrayName1, setAllRental1] = useState(false)
  var [arrayName2, setAllRental2] = useState(false)

  const history = useHistory()
  const options = {
    cssClass: 'my-custom-interface'
  };

  async function takePicture() {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 60
    })
    setPictureURL(cameraPhoto.webPath!)
  }

  async function validation() {
    var result = await getAllRental() as RentHouse[]
    result.forEach(element => {
      if (element.name == name) {
        array = true
        return array
      }
    });

    var newarr = name.replace(/ /g, '.').split("");
    var prop = propertytype.replace(/ /g, '.').split("");
    var bed = bedsroom.replace(/ /g, '.').split("");

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


    if (array == true) {
      array = false
      navigator.vibrate(2500)
      return toast("Name has been created, try another name !!!")
    }

    else if (arrayName == true) {
      arrayName = false
      navigator.vibrate(2500)
      return toast("Name must not have any number, please try again!")
    }

    else if (arrayName1 == true) {
      arrayName1 = false
      navigator.vibrate(2500)
      return toast("Property must not have any number, please try again!")
    }

    else if (arrayName2 == true) {
      arrayName2 = false
      navigator.vibrate(2500)
      return toast("Bedroom must not have any number, please try again!")
    }


    else if (propertytype.trim().length == 0 || bedsroom.trim().length == 0 || moneyRentPrice.trim().length == 0) {
      navigator.vibrate(2500)
      return toast("Please fill all property, bedsroom and money")
    }
    else if (optional.trim().length == 0) {
      navigator.vibrate(2500)
      return toast("You must choose 1 option")
    }
    else if (funitureType.trim().length == 0) {
      navigator.vibrate(2500)
      return toast("You must choose 1 funished type")
    }
    else if (isNaN(parseInt(moneyRentPrice))) {
      navigator.vibrate(2500)
      return toast("Price must be a numbers, please try again")
    }
    else {
      const response = await fetch(pictureURL)
      const fileContent = await response.blob()
      const newCus = {
        propertytype: propertytype,
        optional: optional,
        picBlob: fileContent,
        bedsroom: bedsroom,
        dateOfBirth: dateOfBirth,
        moneyRentPrice: moneyRentPrice,
        funitureType: funitureType,
        notes: notes,
        name: name,
        note2: note2
      }

      insertRental(newCus).then(() => {
        myPlayer?.audioEl.current?.play();
        history.goBack()
      })
    }
  }
  return (
    <IonPage>
      <IonContent fullscreen >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="home" />
            </IonButtons>
            <IonText class="head">
              RentalZ Form
            </IonText>
          </IonToolbar>
        </IonHeader>

        <IonItem lines="none">
          <IonText class="textcre">Property Type</IonText>
          <IonInput placeholder="e.g. flat, house, bungalow" class="login-text1" onIonChange={e => setPropertytype(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonText class="textcre">Bedsroom</IonText>
          <IonInput placeholder="e.g. studio, one, two, etc" class="login-text2" onIonChange={e => setBedsroom(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonText class="textcre">Date and Time</IonText>
          <IonDatetime class="textdate" value={dateOfBirth}
            onIonChange={e => setDateOfBirth(e.detail.value!)}></IonDatetime>
        </IonItem>

        <IonItem lines="none">
          <IonText class="textcre">Price per month</IonText>
          <IonInput placeholder="Price/Month .$" class="login-text3" onIonChange={e => setMoneyRentPrice(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonLabel class="textcre">Furniture Types</IonLabel>
          <IonSelect class="textcre" interface="popover" interfaceOptions={options} onIonChange={e => setFunitureType(e.detail.value!)}>
            <IonSelectOption value="Furnished" class="brown-option">Furnished</IonSelectOption>
            <IonSelectOption value="Unfurnished">Unfurnished</IonSelectOption>
            <IonSelectOption value="Part Furnished">Part Furnished</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem lines="none">
          <IonLabel class="textcre">Rental condition</IonLabel>
          <IonSelect class="textcre" interface="popover" interfaceOptions={options} onIonChange={e => setOptional(e.detail.value!)}>
            <IonSelectOption value="Male only" class="brown-option">Male only</IonSelectOption>
            <IonSelectOption value="Female only">Female only</IonSelectOption>
            <IonSelectOption value="No animal">No animal</IonSelectOption>
            <IonSelectOption value="Full option">Full option</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem lines="none">
          <IonText class="textcre">Notes</IonText>
          <IonInput placeholder="anything." class="login-text5" onIonChange={e => setNotes(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonText class="textcre">Name</IonText>
          <IonInput placeholder="your full name here" class="login-text6" onIonChange={e => setName(e.detail.value!)}></IonInput>
        </IonItem>



        <IonItem lines="none">
          <IonText class="textcre">Picture</IonText>
        </IonItem>
        <IonItem class="pim" lines="none">

          <img src={pictureURL} width="150" height="120" />
          <IonItem class="bui">
            <IonButton shape="round" fill="outline" onClick={takePicture}>Select Picture</IonButton>
          </IonItem>
        </IonItem>
        <ReactAudioPlayer src="assets\nhac.wav" ref={(element) => { myPlayer = element }} />
        <IonButton
          class="buttonnon"
          shape="round"
          fill="outline"
          onClick={() =>
            present({
              cssClass: 'alertCss',
              header: 'Please check again',
              message: 'Check again your information!!! After submitting your information to the system, we will not be responsible for the results.',
              buttons: [
                'No',
                { text: 'Yes', handler: (d) => validation() },
              ],
              onDidDismiss: (e) => console.log('cancel'),
            })
          }
        >
          Create
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CreateForm;