import React from 'react';
import { FilterContext } from './SideNavMenu';
import { getAllListItems, navGroupIncludesFilter } from './NavHelper';

interface NavGroupProps {
    text: string;
    icon?: any;
    filter?: string;
    priority?: number;
    sortAlphabetically: boolean;
}

export default class NavGroup extends React.Component<NavGroupProps> {
    render() {
        const children = this.props.children;
        return <FilterContext.Consumer>
            { filter => navGroupIncludesFilter(this, filter) && <>
                <div>
                    {this.props.text}{this.props.icon}
                </div>
                <ul>
                    {getAllListItems(children, this.props.sortAlphabetically, filter)}
                </ul> 
            </>}
        </FilterContext.Consumer>
    }
}