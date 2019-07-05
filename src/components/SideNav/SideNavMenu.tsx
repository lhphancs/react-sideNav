import React, { ReactElement } from 'react';
import { getAllListItems } from './NavHelper';

interface SideNavMenuProps {
    navs: ReactElement;
    sortAlphabetically: boolean;
}

export const NavFilterContext = React.createContext('');
export const NavSortAlphabeticallyContext = React.createContext(false);

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

    private getResultingDisplay = (allListItems: Element[]) => {
        if (allListItems.length === 0){
            return <div>No result</div>
        }

        return <NavSortAlphabeticallyContext.Provider value={this.props.sortAlphabetically}>
            <NavFilterContext.Provider value={this.state.textFilter}>
                <ul>
                    {allListItems}
                </ul>
            </NavFilterContext.Provider>
        </NavSortAlphabeticallyContext.Provider>
    }

    render() {
        const children = this.props.navs.props.children;
        const allListItems = getAllListItems(children, this.props.sortAlphabetically, this.state.textFilter);

        return <div>
            <div>
                <input className='nav-search' value={this.state.textFilter} onChange={this.inputChange} placeholder='search'/>
            </div>
            { this.getResultingDisplay(allListItems) }
        </div>
    }
}