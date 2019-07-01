import React from 'react';
import { NavFilterContext } from './SideNavMenu';
import TextAndIconWithLink from './TextAndIconWithLink';

interface NavGroupProps {
    text: string;
    icon?: any;
    navFilter?: string;
}

export default class NavGroup extends React.Component<NavGroupProps> {
    private isNavGroup = (reactNode: any) : boolean => {
        return reactNode.type === NavGroup;
    }

    private isLinkToShow = (textAndIconWithLink: TextAndIconWithLink, navFilter: string) : boolean => {
        return textAndIconWithLink.props.text.includes(navFilter);
    }

    private isNavGroupToShow = (navGroup: NavGroup, navFilter: string): boolean => {
        if( navGroup.props.text.includes(navFilter) ) {
            return true;
        }
        const childrens: any[] = React.Children.toArray(navGroup.props.children);
        for (const child of childrens) {
            if (this.isNavGroup(child) ) {
                return this.isNavGroupToShow(child, navFilter);
            }
            if( this.isLinkToShow(child, navFilter) ){
                return true;
            }
        }
        return false;
    }

    renderItems = (navFilter: string) => {
        const childrens = React.Children.toArray(this.props.children);
        return <>
            {this.props.text}{this.props.icon}
            <ul>
                {childrens.map( (child: any, index: number) => {
                    if ( this.isNavGroup(child) ) {
                        const isNavGroupToShow = this.isNavGroupToShow(child, navFilter);
                        return isNavGroupToShow && <li key={index}>{child}</li>
                    }
                    else {
                        return this.isLinkToShow(child, navFilter) && <li key={index}>{child}</li>;
                    }
                })}
            </ul>
        </>
    }

    render() {
        return <NavFilterContext.Consumer>
            { navFilter => this.renderItems(navFilter) }
        </NavFilterContext.Consumer>
    }
}