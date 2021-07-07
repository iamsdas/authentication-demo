import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Secret from './components/Secret';
import Signin from './components/Signin';
import Signup from './components/Signup';

export const UserContext = React.createContext();

function App() {
  // create a global user state
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Switch>
          <Route path='/signin'>
            <Signin />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/'>
            <Secret />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
