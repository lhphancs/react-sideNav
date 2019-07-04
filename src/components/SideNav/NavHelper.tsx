import TextAndIconWithLink from "./TextAndIconWithLink";
import NavGroup from "./NavGroup";
import React from 'react';

const isNavGroup = (reactNode: any) : boolean => {
    return reactNode.type === NavGroup;
}

const isLinkAndIncludesFilter = (textAndIconWithLink: TextAndIconWithLink, filter: string) : boolean => {
    return textAndIconWithLink.props.text.includes(filter);
}

const comparePriority = (item1: any, item2: any) => {
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

export const navGroupIncludesFilter = (navGroup: NavGroup, filter: string): boolean => {
    if( navGroup.props.text.includes(filter) ) {
        return true;
    }
    const childrens: any[] = React.Children.toArray(navGroup.props.children);
    for (const child of childrens) {
        if ( isNavGroup(child) && navGroupIncludesFilter(child, filter) ) {
            return true;
        }
        if( isLinkAndIncludesFilter(child, filter) ){
            return true;
        }
    }
    return false;
}

const getListItemsWithFilterFromChildren = (children: any, filter: string) => {
    const listItems: any[] = [];
    children.forEach( (child: any, index: number) => {
        if ( isNavGroup(child) ) {
            if ( navGroupIncludesFilter(child, filter) ) {
                listItems.push(<li key={index}>{child}</li>);
            }
        }
        else if ( isLinkAndIncludesFilter(child, filter) ) {
             listItems.push( <li key={index}>{child}</li> );
        }
    });
    return listItems;
}


export const getAllListItems = (children: any, sortAlphabetically: boolean, filter: string) => {
        const priorityItems: any = [];
        const nonPriorityItems: any = [];

        const arr = React.Children.toArray(children);
        arr.forEach( (child: any) => {
            if (child.props.priority) {
                priorityItems.push(child);
            }
            else {
                nonPriorityItems.push(child);
            }
        });

        if( sortAlphabetically){
            priorityItems.sort( comparePriority );
            nonPriorityItems.sort( (item1: any, item2: any) => {
                return item1.props.text > item2.props.text ? 1 : -1;
            });
        }
        else {
            priorityItems.sort( (item1: any, item2: any) => {
                return item1.props.priority > item2.props.priority ? 1 : -1;
            });
        }

        const allRenderedItems = [...getListItemsWithFilterFromChildren(priorityItems, filter), ...getListItemsWithFilterFromChildren(nonPriorityItems, filter)];
        return allRenderedItems;
    }