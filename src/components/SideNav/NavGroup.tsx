import React, { ReactChild, ReactNode } from 'react';
import { NavFilterContext } from './SideNavMenu';
import TextAndIconWithLink from './TextAndIconWithLink';

interface NavGroupProps {
    text: string;
    icon?: any;
    navFilter?: string;
    priority?: number;
    sortAlphabetically?: boolean;
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

    getRenderedItemsFromGroup = (navFilter: string, items: any) => {
        return items.map( (child: any, index: number) => {
            if ( this.isNavGroup(child) ) {
                const isNavGroupToShow = this.isNavGroupToShow(child, navFilter);
                return isNavGroupToShow && <li key={index}>{child}</li>
            }
            else {
                return this.isLinkToShow(child, navFilter) && <li key={index}>{child}</li>;
            }
        })
    }

    private comparePriority = (item1: any, item2: any) => {
        if( item1.props.priority > item2.props.priority){
            return 1;
        }
        else if (item1.props.priority < item2.props.priority){
            return -1;
        }
        else {
            return item1.props.text > item2.props.text ? 1 : -1;
        }
    }

    getAllRenderedItems = (navFilter: string) => {
        const priorityItems: any = [];
        const nonPriorityItems: any = [];

        const childrens = React.Children.toArray(this.props.children);
        childrens.forEach( (child: any) => {
            if (child.props.priority) {
                priorityItems.push(child);
            }
            else {
                nonPriorityItems.push(child);
            }
        });

        if( this.props.sortAlphabetically){
            priorityItems.sort( this.comparePriority );
            nonPriorityItems.sort( (item1: any, item2: any) => {
                return item1.props.text > item2.props.text ? 1 : -1;
            });
        }
        else {
            priorityItems.sort( (item1: any, item2: any) => {
                return item1.props.priority > item2.props.priority ? 1 : -1;
            });
        }

        return <>
            {this.props.text}{this.props.icon}
            <ul>
                {this.getRenderedItemsFromGroup(navFilter, priorityItems)}
                {this.getRenderedItemsFromGroup(navFilter, nonPriorityItems)}
            </ul>
        </>
    }

    render() {
        return <NavFilterContext.Consumer>
            { navFilter => this.getAllRenderedItems(navFilter) }
        </NavFilterContext.Consumer>
    }
}