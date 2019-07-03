import React from 'react';
import { NavFilterContext } from './SideNavMenu';
import { getAllRenderedItems, isNavGroupToShow } from './NavHelper';

interface NavGroupProps {
    text: string;
    icon?: any;
    navFilter?: string;
    priority?: number;
    sortAlphabetically: boolean;
}

export default class NavGroup extends React.Component<NavGroupProps> {
    render() {
        const children = this.props.children;
        return <NavFilterContext.Consumer>
            { navFilter => isNavGroupToShow(this, navFilter) && <>
                <li>
                    {this.props.text}{this.props.icon}
                </li>
                <ul>
                    {getAllRenderedItems(children, this.props.sortAlphabetically, navFilter)}
                </ul> 
            </>}
        </NavFilterContext.Consumer>
    }
}