import React from 'react';
import NavGroup from './NavGroup';
import TextAndIconWithLink from './TextAndIconWithLink';

interface SideNavMenuProps {
    sortAlphabetically: boolean;
}

export const NavFilterContext = React.createContext('');

export class SideNavMenu extends React.Component<SideNavMenuProps, {textFilter: string}>{
    constructor(props: SideNavMenuProps){
        super(props);
        this.state = {
            textFilter: ''
        };
    }

    private inputChange = (e: any) => {
        this.setState({textFilter: e.target.value});
    }

    render() {
        return <div>
            <div>
                <input className='nav-search' value={this.state.textFilter} onChange={this.inputChange} placeholder='search'/>
            </div>
            <NavFilterContext.Provider value={this.state.textFilter}>
                <NavGroup sortAlphabetically={true} text='NavGroup1'>
                    <NavGroup sortAlphabetically={true} text='NavGroup2' priority={2}>
                        <TextAndIconWithLink text='B' url=''/>
                        <TextAndIconWithLink text='C' url=''/>
                    </NavGroup>
                    <TextAndIconWithLink text='AAA' url='' priority={2}/>
                    <TextAndIconWithLink text='BBB' url='' priority={1}/>
                    <TextAndIconWithLink text='CCC' url='' priority={3}/>
                </NavGroup>
            </NavFilterContext.Provider>
        </div>
    }
}