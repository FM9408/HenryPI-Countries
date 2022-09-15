import './App.css';
import { Route, Router, Switch, useHistory} from 'react-router-dom';
import React from 'react';
import TemporalScreen from './components/pages/temporalScreen/temporalScreen';
import Hompage from './components/pages/homepage/homepage';
import CountryPage from './components/pages/countryPage/countryPage';
import AddActivity from './components/pages/addactivityPage/addActivity';
import Navbar from './components/individualComponents/navbar/navbar';
function App() {
  let history = useHistory()


  return (
    <div className="App">
      <Router history={history}>
          <Route path='/countries'>
            <Navbar />
          </Route>

      <Switch  >
        <Route exact path='/'>
          <TemporalScreen />
        </Route>
        
     
        <Route exact path='/countries/home'>
          <Hompage />
        </Route>
        <Route exact path='/countries/:id'>
          <CountryPage />
        </Route>
        <Route path='/countries/:id/addActivity'>
          <AddActivity />
        </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
