import React from 'react';
import { NavLink } from 'react-router-dom';

interface ITextAndIconWithLink {
    text: string;
    icon?: any;
    url: string;
    priority?: number;
    exact?: true;
}

export default class TextAndIconWithLink extends React.Component<ITextAndIconWithLink> {
    render() {
        const props = this.props;
        return <NavLink activeClassName='active' exact={props.exact} to={props.url} key={props.url}>{props.icon}{props.text}</NavLink>
    }
}