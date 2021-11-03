import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

//import pages
import Home from './pages/Home';
import CreateForm from './pages/CreateForm';
import View from './pages/View';
import Views from './pages/Views';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

// css 
import Update from './pages/Update';
import Updated from './pages/Updated';
import Info from './pages/Info';


const App: React.FC = () => (
  <IonApp >
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" component={Home} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/CreateForm" component={CreateForm} exact />
        <Route path="/View" component={View} exact />
        <Route path="/Views/:id" component={Views} exact />
        <Route path="/Update" component={Update} exact />
        <Route path="/Updated/:id" component={Updated} exact />
        <Route path="/Info" component={Info} exact />
      </IonRouterOutlet>
      
    </IonReactRouter>
  </IonApp>
);

export default App;
