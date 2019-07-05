import React from 'react';
import { SideNavMenu } from './components/SideNav/SideNavMenu';
import { BrowserRouter } from 'react-router-dom';
import TextAndIconWithLink from './components/SideNav/TextAndIconWithLink';
import NavGroup from './components/SideNav/NavGroup';

function App() {
  const navs = <>
    <TextAndIconWithLink text='BBB' url='' priority={1}/>
    <NavGroup text='NavGroup1'>
        <NavGroup text='NavGroup2' priority={2}>
            <TextAndIconWithLink text='B' url=''/>
            <TextAndIconWithLink text='C' url=''/>
        </NavGroup>
        <TextAndIconWithLink text='DD' url='' priority={2}/>
        <TextAndIconWithLink text='CCC' url='' priority={2}/>
    </NavGroup>
  </>;

  return <BrowserRouter>
    <SideNavMenu navs={navs} sortAlphabetically={true}/>
  </BrowserRouter>;
}

export default App;