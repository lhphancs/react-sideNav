import React from 'react';
import { SideNavMenu } from './components/SideNav/SideNavMenu';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return <BrowserRouter>
    <SideNavMenu sortAlphabetically={true}/>
  </BrowserRouter>;
}

export default App;