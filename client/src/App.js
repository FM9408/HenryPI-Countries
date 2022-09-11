import './App.css';
import { Route, Switch} from 'react-router-dom';
import React from 'react';
import TemporalScreen from './components/pages/temporalScreen/temporalScreen';
import Hompage from './components/pages/homepage/homepage';
import CountryPage from './components/pages/countryPage/countryPage';

function App() {
  


  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <TemporalScreen />
        </Route>
        <Route exact path='/home'>
          <Hompage />
        </Route>
        <Route exact path='/country/:id'>
          <CountryPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
