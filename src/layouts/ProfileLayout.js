import React, {Component} from 'react';
import Profile from '../LayoutPages/Profile'
import {Route} from 'react-router-dom';

const ProfileLayout = ({children, ...rest}) => {
    return (<Profile children={children}/>);
}

const ProfileLayoutRoute = ({component: Component, ...rest}) =>{
    return (
        <Route {...rest} render={matchProps=>(
            <ProfileLayout>
                <Component {...matchProps}/>
            </ProfileLayout>
        )}/>
    );
}

export default ProfileLayoutRoute;
