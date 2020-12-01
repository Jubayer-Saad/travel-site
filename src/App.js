import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import NoMatch from './components/NoMatch/NoMatch';
import firebase from "firebase/app";
import "firebase/auth";
import Booking from './components/Booking/Booking';
import Auth from './components/Auth/Auth';
import Hotels from './components/Hotels/Hotels';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import firebaseConfig from './firebase.config';

export const UserContext = createContext();

firebase.initializeApp(firebaseConfig);

function App() {
  const [showArea, setShowArea] = useState(
    {
      title: "Cox's Bazar",
      shortDescription: "Cox's Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it...",
      description: "Cox's Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it is infamous for the largest refugee camp in the world. It is located 150 km (93 mi) south of the divisional headquarter city of Chittagong. Cox's Bazar is also known by the name Panowa, which translates literally as yellow flower. Another old name was Palongkee...",
      img: "https://i.ibb.co/3fwykdc/rectangle1.png"
  }
  )
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName]=useState("user");

  return (
    <UserContext.Provider value={[showArea, setShowArea, loggedIn, setLoggedIn, name, setName]} className="App">
        <Router>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route exact path="/booking">               
                <Booking />
            </Route>
            <Route exact path="/auth">
                <Auth />
            </Route>
            <PrivateRoute exact path="/hotels">
                <Hotels />
            </PrivateRoute>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Router>
    </UserContext.Provider>
  );
}

export default App;

