import React from 'react';
import { NavFilterContext, NavSortAlphabeticallyContext } from './SideNavMenu';
import { getAllListItems, navGroupIncludesFilter } from './NavHelper';

interface NavGroupProps {
    text: string;
    icon?: any;
    filter?: string;
    priority?: number;
    sortAlphabetically?: boolean;
}

export default class NavGroup extends React.Component<NavGroupProps> {
    render() {
        const children = this.props.children;
        return <NavSortAlphabeticallyContext.Consumer>
            {sortAlphabetically => 
                <NavFilterContext.Consumer>
                    { filter => navGroupIncludesFilter(this, filter) && <>
                        <div>
                            {this.props.text}{this.props.icon}
                        </div>
                        <ul>
                            {getAllListItems(children, sortAlphabetically, filter)}
                        </ul> 
                    </>}
                </NavFilterContext.Consumer>
            }
        </NavSortAlphabeticallyContext.Consumer>
    }
}