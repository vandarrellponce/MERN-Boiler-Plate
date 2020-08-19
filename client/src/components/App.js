import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from './main pages/About'
import Home from './main pages/Home'
import Login from './user pages/Login';
import RegisterPage from './user pages/Register';

function App() {
  
  return (
    
    <div className="App">
      <Switch>
        <Route exact path = '/' component={Home} />
        <Route path = '/about' component={About} />
        <Route path = '/login' component={Login} />
        <Route path = '/register' component={RegisterPage} />
      </Switch>
    </div>
  );
}
export default App;