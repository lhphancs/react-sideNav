import React from 'react';
import NavGroup from './NavGroup';
import TextAndIconWithLink from './TextAndIconWithLink';
import { getAllListItems } from './NavHelper';

interface SideNavMenuProps {
    sortAlphabetically: boolean;
}

export const FilterContext = React.createContext('');

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

    private getNavs = () => {
        return <>
            <TextAndIconWithLink text='BBB' url='' priority={1}/>
            <NavGroup sortAlphabetically={true} text='NavGroup1'>
                <NavGroup sortAlphabetically={true} text='NavGroup2' priority={2}>
                    <TextAndIconWithLink text='B' url=''/>
                    <TextAndIconWithLink text='C' url=''/>
                </NavGroup>
                <TextAndIconWithLink text='AAA' url='' priority={2}/>
                <TextAndIconWithLink text='CCC' url='' priority={3}/>
            </NavGroup>
        </>
    }

    render() {
        const children = this.getNavs().props.children;
        const allRenderedItems = getAllListItems(children, this.props.sortAlphabetically, this.state.textFilter);

        const resultingDisplay = allRenderedItems.length === 0 ? <div>No result</div> : <FilterContext.Provider value={this.state.textFilter}>
                <ul>
                    {allRenderedItems}
                </ul>
            </FilterContext.Provider>

        return <div>
            <div>
                <input className='nav-search' value={this.state.textFilter} onChange={this.inputChange} placeholder='search'/>
            </div>
            {resultingDisplay}
        </div>
    }
}