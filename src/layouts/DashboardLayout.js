import React, {Component} from 'react';
import Dashboard from '../LayoutPages/Dashboard'
import {Route} from 'react-router-dom';

const DashboardLayout = ({children, ...rest}) => {
    return (<Dashboard children={children}/>);
}

const DashboardLayoutRoute = ({component: Component, ...rest}) =>{
    return (
      <Route {...rest} render={matchProps=>(
          <DashboardLayout>
              <Component {...matchProps}/>
          </DashboardLayout>
      )}/>
    );
}

export default DashboardLayoutRoute;
