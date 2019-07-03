import TextAndIconWithLink from "./TextAndIconWithLink";
import NavGroup from "./NavGroup";
import React from 'react';

export const isNavGroup = (reactNode: any) : boolean => {
    return reactNode.type === NavGroup;
}

const isLinkToShow = (textAndIconWithLink: TextAndIconWithLink, navFilter: string) : boolean => {
    return textAndIconWithLink.props.text.includes(navFilter);
}

const isNavGroupToShow = (navGroup: NavGroup, navFilter: string): boolean => {
    if( navGroup.props.text.includes(navFilter) ) {
        return true;
    }
    const childrens: any[] = React.Children.toArray(navGroup.props.children);
    for (const child of childrens) {
        if (isNavGroup(child) ) {
            return isNavGroupToShow(child, navFilter);
        }
        if( isLinkToShow(child, navFilter) ){
            return true;
        }
    }
    return false;
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

const getRenderedItemsFromGroup = (navFilter: string, items: any) => {
    return items.map( (child: any, index: number) => {
        if ( isNavGroup(child) ) {
            const isNavGroupAndToShow = isNavGroupToShow(child, navFilter);
            return isNavGroupAndToShow && <li key={index}>{child}</li>
        }
        else {
            return isLinkToShow(child, navFilter) && <li key={index}>{child}</li>;
        }
    })
}

export const getAllRenderedItems = (items: any, sortAlphabetically: boolean, navFilter: string) => {
        const priorityItems: any = [];
        const nonPriorityItems: any = [];

        const childrens = React.Children.toArray(items);
        childrens.forEach( (child: any) => {
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

        return <>
            {getRenderedItemsFromGroup(navFilter, priorityItems)}
            {getRenderedItemsFromGroup(navFilter, nonPriorityItems)}
        </>
    }