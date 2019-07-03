import React from 'react';
import { NavFilterContext } from './SideNavMenu';
import { isNavGroup, getAllRenderedItems } from './NavHelper';

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
        return isNavGroup(this) && <NavFilterContext.Consumer>
            { navFilter => <ul>
                {getAllRenderedItems(children, this.props.sortAlphabetically, navFilter)}
            </ul> }
        </NavFilterContext.Consumer>
    }
}