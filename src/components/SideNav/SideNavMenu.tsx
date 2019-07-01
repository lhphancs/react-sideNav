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
                <NavGroup text='NavGroup1'>
                    <TextAndIconWithLink text='A' url=''/>
                    <NavGroup text='NavGroup2'>
                        <TextAndIconWithLink text='B' url=''/>
                        <TextAndIconWithLink text='C' url=''/>
                    </NavGroup>
                </NavGroup>
            </NavFilterContext.Provider>
        </div>
    }
}